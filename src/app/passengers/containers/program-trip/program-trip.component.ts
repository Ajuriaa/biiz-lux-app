import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-program-trip',
  templateUrl: './program-trip.component.html',
  styleUrls: ['./program-trip.component.scss']
})
export class ProgramTripComponent implements OnInit {
  public showCalendar = false;

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  newMap!: GoogleMap;

  ngOnInit() {
    GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsApiKey,
      config: {
        center: {
          // TODO: remove this hardcoded values when gps implemented properly
          lat: 14.060536,
          lng: -87.241214
        },
        zoom: 17,
        clickableIcons: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        gestureHandling: "greedy"
      },
      language: 'es'
    });
  }
}
