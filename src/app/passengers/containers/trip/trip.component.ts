import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environments';
import { SharedDataService } from 'src/app/core/services';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-green.png';
const MARKER_IMAGE = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/marker.png';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit, OnDestroy {
  public imageUrl = IMAGE_URL;
  private markerImage = MARKER_IMAGE;
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  newMap!: GoogleMap;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    const coords = this.sharedDataService.getCoordinates();
    new Promise((resolve) => setTimeout(resolve, 500))
    .then(() => {
      return GoogleMap.create({
        id: 'map',
        element: this.mapRef.nativeElement,
        apiKey: environment.mapsApiKey,
        config: {
          center: {
            lat: coords.latitude,
            lng: coords.longitude
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

      this.addMarker(coords);
    });
  }

  ngOnDestroy(): void {
    this.newMap.destroy();
  }

  private removeMarker(coordinates: {longitude: number, latitude: number}, markerId: string): void {
    this.newMap.removeMarker(markerId);
    this.addMarker(coordinates);
  }

  private async addMarker(coordinates: {longitude: number, latitude: number}): Promise<void> {
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: coordinates.latitude,
        lng: coordinates.longitude
      },
      iconUrl: this.markerImage,
      draggable: true
    });

    await this.newMap.setOnMapClickListener((event) => {
      const newCoords = {latitude: event.latitude, longitude: event.longitude};
      this.removeMarker(newCoords, markerId);
    });
  }
}

