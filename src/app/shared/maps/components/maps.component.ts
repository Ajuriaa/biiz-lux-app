import { Component } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
})
export class MapsComponent {
  public centerLatLong: google.maps.LatLngLiteral = {lat: 14.060536, lng: -87.241214};
  public options: google.maps.MapOptions = {
    center: this.centerLatLong,
    zoom: 17,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    gestureHandling: "greedy"
  };
}
