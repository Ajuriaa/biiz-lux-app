import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SharedDataService } from './shared-data.service';
import { WebsocketChannels } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class TripWebsocketService {
  private socket!: WebSocket;
  private tripId: string = '';

  constructor(
    private sharedData: SharedDataService
  ) {}

  public unsubscribe(): void {
    const id = JSON.stringify({channel: 'CurrentTripChannel'});
    const payload = JSON.stringify({
      command: 'unsubscribe',
      identifier: id
    });
    this.socket.send(payload);
  }

  public connectWebSocket(tripId: string) {
    this.tripId = tripId;
    this.socket = new WebSocket(environment.wsUrl);

    this.socket.onopen = () => {
      const id = JSON.stringify({
        channel: WebsocketChannels.TRIP,
        trip_id: tripId
      });
      const payload = JSON.stringify({
        command: 'subscribe',
        identifier: id
      });
      this.socket.send(payload);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message = data.message;

      if(message.title === 'driverCoords'){
        // data = {title: 'driverCoords', driverCoords = {lat: 1, lng: 2}}
        const coords = {lat: message.driverCoords.lat, lng: message.driverCoords.lng};
        this.sharedData.setDriverCoord(coords);
      }

      if(message.title === 'driverArrived'){
        // data = {title: 'driverArrived'}
        this.sharedData.setDriverArrived(true);
      }

      if(message.title === 'tripFinished'){
        // data = {title: 'tripFinished'}
        this.sharedData.setFinishTrip(true);
      }
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error('Connection died');
      }

      setTimeout(() => this.connectWebSocket(this.tripId), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
}
