import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService, SharedDataService } from 'src/app/core/services';
import { IDriver } from 'src/app/core/interfaces';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { trigger, transition, style, animate } from '@angular/animations';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-green.png';
const EVENTS = [
  {id: 0, label: 'scan'},
  {id: 1, label: 'concerts'},
  {id: 2, label: 'trendy'},
  {id: 3, label: 'sports'},
  {id: 4, label: 'private'},
];
const CHOCHI_COORDS = {lat: 14.09062237766548, lng: -87.1642754423291};

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
  public selectedEvent = EVENTS[0];
  public eventSelected = false;
  public imageUrl = IMAGE_URL;
  public currentAddress = 'CASITA';
  public eventName = '';
  public selectedConcert = 0;
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

  public selectEvent(event: { id: number, label: string }): void {
    this.selectedEvent = event;
    this.eventSelected = true;
    console.log('se seleccionó el evento: ', event);
  }

  public eventList(): void {
    this.eventSelected = false;
  }

  public selectConcert(id: number): void {
    this.selectedConcert = id;
    this.eventName = 'ESTADIO CHOCHI SOSA';
  }

  public startTrip(): void {
    if (this.selectedConcert !== 0) {
      this.map.setZoom(15);
      this.mapService.addMarker(CHOCHI_COORDS, this.map, MarkerUrl.passenger);
      this.mapService.renderRoute(
        this.currentCoordinates,
        CHOCHI_COORDS,
        this.map
      );
    }
  }
}
