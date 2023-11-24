import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService, SharedDataService } from 'src/app/core/services';
import { ICoordinate, IDriver } from 'src/app/core/interfaces';
import { DEFAULT_COORDS, EVENT } from 'src/app/core/constants';
import { Events, MarkerUrl } from 'src/app/core/enums';
import { trigger, transition, style, animate } from '@angular/animations';
import { BarcodeScanner, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { IEvent } from '../../interfaces';
import { firstValueFrom } from 'rxjs';
import { EventQueries } from '../../services';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-green.png';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [
    trigger(
      'inAnimation',[
        transition(':enter',
          [
            style({ opacity: 0 }),
            animate('1.5s ease-out', style({ opacity: 1 }))
          ]
        )
      ]
    )
  ]
})

export class EventsComponent implements OnInit, OnDestroy {
  public loading = false;
  public allEvents: IEvent[] = [];
  public map!: google.maps.Map;
  public drivers : IDriver[] = [];
  public selectedEvent = '';
  public eventSelected = false;
  public imageUrl = IMAGE_URL;
  public currentAddress = 'CASITA';
  public eventName = '';
  public selectedConcert = 0;
  public matchSelected = false;
  public hideCard = false;
  public scanOpen = false;
  public event = EVENT;
  public filteredEvents: IEvent[] = [];
  public singleEventSelected = false;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;

  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private _eventQuery: EventQueries
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentCoordinates = await this.sharedDataService.setDefaultCoordinates();
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    const marker = this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.passenger);
    this.sharedDataService.setCurrentMarker(marker);
    this._eventQuery.getEvents().subscribe(({ data }) => {
      if (data) {
        this.allEvents = data.allEvents;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
  }

  public selectEventType(event: string): void {
    this.selectedEvent = event;
    this.eventSelected = true;
    const category = Events[event as keyof typeof Events];
    this.filteredEvents = this.allEvents.filter(event => event.category === category);
  }

  public startTrip(event: IEvent): void {
    if (!this.singleEventSelected){
      return;
    }
    const coords = {lat: +event.locationCoordinates.lat, lng: +event.locationCoordinates.lng};
    this.mapService.addMarker(coords, this.map, MarkerUrl.passenger);
    this.mapService.renderRoute(
      this.currentCoordinates,
      coords,
      this.map
    );
  }

  public backToEvents(): void {
    this.eventSelected = false;
    this.singleEventSelected = false;
  }

  public selectEvent(event: IEvent): void {
    this.singleEventSelected = true;
    this.event = event;
    this.hideCard = true;
    this.eventName = event.addressName;
  }

  public async scan(): Promise<void> {
    this.scanOpen = true;

    // Add the `barcodeScanned` listener
    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async result => {
        console.log(result.barcode);
      },
    );

    // Start the barcode scanner
    await BarcodeScanner.startScan();
  }
}
