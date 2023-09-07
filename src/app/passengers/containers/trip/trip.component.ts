import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { environment } from 'src/environments/environments';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-green.png';
const MARKER_IMAGE = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/marker.png';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  public imageUrl = IMAGE_URL;
  public coords = { latitude: 0, longitude: 0 };
  private markerImage = MARKER_IMAGE;
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  newMap!: GoogleMap;

  ngOnInit() {
    this.setDefaultCoordinates();
    new Promise((resolve) => setTimeout(resolve, 500))
    .then(() => {
      return GoogleMap.create({
        id: 'map',
        element: this.mapRef.nativeElement,
        apiKey: environment.mapsApiKey,
        config: {
          center: {
            lat: this.coords.latitude,
            lng: this.coords.longitude
          },
          zoom: 17,
          clickableIcons: false,
          disableDefaultUI: true,
          keyboardShortcuts: false,
          gestureHandling: "greedy"
        },
        language: 'es'
      });
    })
    .then((map) => {
      this.newMap = map;

      this.newMap.addMarker({
        coordinate: {
          lat: this.coords.latitude,
          lng: this.coords.longitude
        },
        iconUrl: this.markerImage
      });
    });
  }

  private async setDefaultCoordinates(): Promise<void> {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });
    this.coords = coordinates.coords;
  };
}

