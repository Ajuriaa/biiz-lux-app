import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { IDriver, ITripInfo } from '../interfaces';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private drivers: IDriver[] = [];
  private socket!: WebSocket;

  constructor(
    private sharedData: SharedDataService
  ) {
    this.connectWebSocket();
  }


  // This function is used to send a message to the server to get the driver coordinates.
  // The server will then send the driver coordinates back to the client.
  // The client will then update the driver coordinates in the shared data service.
  public getDriverCoordinates() {
    const id = JSON.stringify({channel: 'DriverCoordinatesChannel'});
    const data = JSON.stringify({action: 'get_driver_coordinates'});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: data
    });
    this.socket.send(payload);
  }

  public startTrip(travelInfo: ITripInfo) {
    const id = JSON.stringify({channel: 'DriverCoordinatesChannel'});
    const data = JSON.stringify({action: 'new_travel', info: travelInfo});
    const payload = JSON.stringify({
      command: 'message',
      identifier: id,
      data: data
    });
    this.socket.send(payload);
  }

  public connectWebSocket() {
    this.socket = new WebSocket(environment.wsUrl);

    // This function is called when the websocket connection is opened.
    // To tell the DriverCoordinatesChannel that we want to subscribe to it.
    this.socket.onopen = () => {
      this.drivers = [];
      const id = JSON.stringify({channel: 'DriverCoordinatesChannel'});
      const payload = JSON.stringify({
        command: 'subscribe',
        identifier: id
      });
      this.socket.send(payload);
    };

    // This function is called when the websocket connection receives a message.
    // The message is parsed into a JSON object.
    // If the message title is 'COORD', then the coordinates are added to the coords array.
    // The coords array is then set in the shared data service.

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if(data.message.title === 'COORD'){
        const coords = {lat: data.message.lat, lng: data.message.lng};
        const newDriver = {id: data.message.driver, coordinates: coords};

        if (!this.drivers.some((driver) => driver.id === newDriver.id)) {
          this.drivers.push(newDriver);
        }

        this.sharedData.setDriverCoordinates(this.drivers);
      }
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error('Connection died');
      }
      // Attempt to reconnect after a delay (you can implement a reconnection strategy here)
      setTimeout(() => this.connectWebSocket(), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
}
