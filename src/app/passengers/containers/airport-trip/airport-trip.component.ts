import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { MapService, SharedDataService } from 'src/app/core/services';

const AIRPORTS = [
  {
    name: 'XPL',
    coordinates: { lat: 14.391169673461347, lng: -87.61760300790324 }
  },
  {
    name: 'RVM',
    coordinates: { lat: 15.45727548202803 , lng: -87.92722435590467 }
  },
  {
    name: 'TCT',
    coordinates: { lat: 14.060866221308673 , lng: -87.21924129961387 }
  },
  {
    name: 'GLS',
    coordinates: { lat: 15.745479398962456 , lng: -86.8515251652237 }
  }
];

const DEFAULT_AIRPORT = { name: '', coordinates: { lat: 0, lng: 0 }};

@Component({
  selector: 'app-airport-trip',
  templateUrl: './airport-trip.component.html',
  styleUrls: ['./airport-trip.component.scss']
})
export class AirportTripComponent implements OnInit {
  public selectedAirport = DEFAULT_AIRPORT;
  public currentAddress = 'DIRECCION ACTUAL';
  public loading = false;
  public map!: google.maps.Map;
  public showCalendar = false;
  public isRouteRendered = false;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private airports = AIRPORTS;
  private currentCoordinates = DEFAULT_COORDS;

  constructor(
    private _route: ActivatedRoute,
    private mapService: MapService,
    private sharedDataService: SharedDataService
  ) { }

  async ngOnInit(): Promise<void> {
    this.currentCoordinates = await this.sharedDataService.setDefaultCoordinates();
    const airportName = this._route.snapshot.url.join('/').split('/').pop() || '';
    this.selectedAirport = this.airports.find((airport) => airport.name === airportName) || DEFAULT_AIRPORT;
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.passenger);
    this.mapService.addMarker(this.selectedAirport.coordinates, this.map, MarkerUrl.passenger);
  }

  public toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  public renderRoute(): void {
    this.showCalendar = false;
    this.isRouteRendered = true;

    this.mapService.renderRoute(
      this.currentCoordinates,
      this.selectedAirport.coordinates,
      this.map
    );
  }
}
