import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService, SharedDataService, WebsocketService } from 'src/app/core/services';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { ToastComponent } from 'src/app/shared/toaster';


@Component({
  selector: 'app-awaiting-trip',
  templateUrl: './awaiting-trip.component.html',
  styleUrls: ['./awaiting-trip.component.scss']
})
export class AwaitingTripComponent implements OnInit {
  public map!: google.maps.Map;
  public driver = { id: 1, coordinates: DEFAULT_COORDS };
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;

  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private websocket: WebsocketService,
    private toaster: ToastComponent
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentCoordinates = await this.sharedDataService.setDefaultCoordinates();
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.passenger);
  }
}
