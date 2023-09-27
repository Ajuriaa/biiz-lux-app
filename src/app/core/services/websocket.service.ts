import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ICoordinate } from '../interfaces';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private coords: ICoordinate[] = [];
  private socket!: WebSocket;

  constructor(
    private sharedData: SharedDataService
  ) {
    this.connectWebSocket();
  }

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

  public connectWebSocket() {
    this.socket = new WebSocket(environment.wsUrl);

    this.socket.onopen = () => {
      this.coords = [];
      const id = JSON.stringify({channel: 'DriverCoordinatesChannel'});
      const payload = JSON.stringify({
        command: 'subscribe',
        identifier: id
      });
      this.socket.send(payload);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if(data.message.title === 'COORD'){
        const x = {lat: data.message.lat, lng: data.message.lng};
        this.coords.push(x);
        this.sharedData.setDriverCoordinates(this.coords);
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
