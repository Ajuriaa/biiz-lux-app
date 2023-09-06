import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environments';

const IMAGE_URL = 'https://biz-app-bucket.s3.us-east-2.amazonaws.com/iiz-green.png';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  public imageUrl = IMAGE_URL;
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  newMap!: GoogleMap;

  ngOnInit() {
    setTimeout(() => {
      GoogleMap.create({
        id: 'map',
        element: this.mapRef.nativeElement,
        apiKey: environment.mapsApiKey,
        config: {
          center: {
            // TODO: remove this hardcoded values when GPS implemented properly
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
    }, 500);
  }
}

