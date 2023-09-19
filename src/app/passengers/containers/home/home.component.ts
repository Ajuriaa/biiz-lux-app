import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { SharedDataService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.checkGeolocationPermissions();
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
}
