import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { SharedDataService, WebsocketService } from 'src/app/core/services';
import { getClosestDriver } from 'src/app/core/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public directionsService: google.maps.DirectionsService;
  public time = '-- mins';

  constructor(
    private sharedDataService: SharedDataService,
    private websocket: WebsocketService,
    ) {
      this.directionsService = new google.maps.DirectionsService();
    }

  ngOnInit(): void {
    this.checkGeolocationPermissions();
    setTimeout(() => this.websocket.getDriverCoordinates(), 500);
    setTimeout(() => this.getDriverTime(), 1000);
  }


  public test(){
    this.getDriverTime();
  }

  private async checkGeolocationPermissions(): Promise<any> {
    const permissions = await Geolocation.checkPermissions();
    if (permissions.location === 'granted') {
      this.setDefaultCoordinates();
      return;
    }
    this.requestGeolocation();
  }

  private async requestGeolocation(): Promise<any> {
    await Geolocation.requestPermissions();
    setTimeout(() => {
      this.checkGeolocationPermissions();
    }, 500);
  }

  private async setDefaultCoordinates(): Promise<void> {
    const coords = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });
    const coordinates = { lat: coords.coords.latitude, lng: coords.coords.longitude };
    this.sharedDataService.setCoordinates(coordinates);
  }

  private getDriverTime(): void {
    const currentCoordinates = this.sharedDataService.getCoordinates();
    const driverCoords = getClosestDriver(currentCoordinates, this.sharedDataService.getDriverCoordinates());

    const request = {
      origin: driverCoords,
      destination: currentCoordinates,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.PESSIMISTIC
      }
    };

    this.directionsService.route(request, (result, status) => {
      if (status == 'OK' && result) {
        this.time = result?.routes[0]?.legs[0]?.duration_in_traffic?.text || '10 mins';
      }
    });
  }
}
