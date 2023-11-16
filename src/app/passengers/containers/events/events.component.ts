import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService, SharedDataService } from 'src/app/core/services';
import { ICoordinate, IDriver } from 'src/app/core/interfaces';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { trigger, transition, style, animate } from '@angular/animations';
import { BarcodeScanner, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-green.png';
const CHOCHI_COORDS = {lat: 14.09062237766548, lng: -87.1642754423291};
const MATCH_COORDS = {lat: 14.098895689458885, lng: -87.20308958445806};
const EVENTS = [
  {id: 1, label: 'scan'},
  {id: 2, label: 'concerts', coords: CHOCHI_COORDS},
  {id: 3, label: 'trendy'},
  {id: 4, label: 'sports', coords: MATCH_COORDS},
  {id: 5, label: 'private'},
];

const DESCRIPTION = 'Nuestro servicio en Bizz consiste en ofrecer una plataforma tecnológica que conecta a usuarios y conductores de diferentes opciones de transporte en un solo lugar. Desde taxis y vehículos de lujo hasta servicio de asiste';

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
  public map!: google.maps.Map;
  public drivers : IDriver[] = [];
  public events = EVENTS;
  public selectedEvent = {id: 0, label: '', coords: DEFAULT_COORDS};
  public eventSelected = false;
  public imageUrl = IMAGE_URL;
  public currentAddress = 'CASITA';
  public eventName = '';
  public selectedConcert = 0;
  public matchSelected = false;
  public hideCard = false;
  public scanOpen = false;
  public message = DESCRIPTION;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;

  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentCoordinates = await this.sharedDataService.setDefaultCoordinates();
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    const marker = this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.passenger);
    this.sharedDataService.setCurrentMarker(marker);
  }

  ngOnDestroy(): void {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
  }

  public selectEvent(event: { id: number, label: string, coords: ICoordinate }): void {
    this.selectedEvent = event;
    this.eventSelected = true;
  }

  public eventList(): void {
    this.selectedEvent = {id: 0, label: '', coords: DEFAULT_COORDS};
    this.eventSelected = false;
  }

  public selectConcert(id: number): void {
    this.hideCard = true;
    this.selectedConcert = id;
    this.eventName = 'ESTADIO CHOCHI SOSA';
  }

  public selectMatch(): void {
    this.hideCard = true;
    this.eventName = 'ESTADIO JOSE DE LA PAZ UCLES';
    this.matchSelected = true;
  }

  public startTrip(event: { id: number, label: string, coords: ICoordinate }): void {
    const coords = event.coords;
    this.map.setZoom(15);
    this.mapService.addMarker(coords, this.map, MarkerUrl.passenger);
    this.mapService.renderRoute(
      this.currentCoordinates,
      coords,
      this.map
    );
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
