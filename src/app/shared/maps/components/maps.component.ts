import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
})
export class MapsComponent implements OnInit {
  public centerLatLong: google.maps.LatLngLiteral = {lat: 14.060536, lng: -87.241214};
  public options: google.maps.MapOptions = {
    center: this.centerLatLong,
    zoom: 17,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    gestureHandling: "greedy"
  };

  ngOnInit(): void {

  }
}
