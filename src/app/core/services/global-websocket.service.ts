import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Subject } from 'rxjs';
import { IDriver, ITripInfo } from '../interfaces';
import { CookieHelper } from '../helpers';
import { WebsocketChannels } from '../enums';
import { SharedDataService } from './shared-data.service';
import { TripWebsocketService } from './trip-websocket.service';

@Injectable({
  providedIn: 'root',
})

export class GlobalWebsocketService {
  private drivers: IDriver[] = [];
  private socket!: WebSocket;
  public messageSubject = new Subject<string>();

  constructor(
    private sharedData: SharedDataService,
    private tripSocket: TripWebsocketService,
  ) {}

  public getDriverCoordinates() {
    const id = JSON.stringify({channel: 'AvailableDriversChannel'});
    const data = JSON.stringify({action: 'ask_for_available_drivers'});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: data
    });
    this.socket.send(payload);
  }

  public startTrip(travelInfo: ITripInfo) {
    const id = JSON.stringify({channel: 'AvailableDriversChannel'});
    const data = JSON.stringify({action: 'send_data', info: travelInfo});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: data
    });
    this.socket.send(payload);
  }

  public unsubscribe(): void {
    const id = JSON.stringify({channel: 'AvailableDriversChannel'});
    const payload = JSON.stringify({
      command: 'unsubscribe',
      identifier: id
    });
    this.socket.send(payload);
  }

  public connectWebSocket() {
    this.socket = new WebSocket(environment.wsUrl);

    this.socket.onopen = () => {
      this.drivers = [];
      const id = JSON.stringify({channel: WebsocketChannels.GLOBAL});
      const payload = JSON.stringify({
        command: 'subscribe',
        identifier: id
      });
      this.socket.send(payload);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message = data.message;

      if(message?.title === 'driverCoordinates'){
        // data = {title: 'driverCoordinates', driver: driverId, lat: 1, lng: 1}
        const coords = {lat: message.lat, lng: message.lng};
        const newDriver = {id: message.driver, coordinates: coords};

        if (!this.drivers.some((driver) => +driver.id === +newDriver.id)) {
          this.drivers.push(newDriver);
        }

        this.sharedData.setDriverCoordinates(this.drivers);
      }

      if(message?.title === 'driverResponse' && message.passengerId === +this._getPassengerId()){
        if (message.answer === 'accepted') {
          const currentTrip = { passengerId: message.passengerId, tripId: message.tripId };
          this.sharedData.setCurrentTrip(currentTrip);
          this.tripSocket.connectWebSocket(currentTrip.tripId);
          this.unsubscribe();
        }
        this.messageSubject.next(message.answer);
      }
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error('Connection died');
      }

      setTimeout(() => this.connectWebSocket(), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private _getPassengerId(): string {
    return CookieHelper.getUserInfo();
  }
}
