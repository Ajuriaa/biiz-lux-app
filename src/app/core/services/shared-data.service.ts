// shared-data.service.ts
import { Injectable } from '@angular/core';
import { ICoordinate } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private coordinates = { lat: 0, lng: 0 };
  private marker = new google.maps.Marker();
  private destinationMarker = new google.maps.Marker();

  public setCoordinates(coordinates: ICoordinate) {
    this.coordinates = coordinates;
  }

  public getCoordinates() {
    return this.coordinates;
  }

  public setCurrentMarker(marker: google.maps.Marker) {
    this.marker = marker;
  }

  public getCurrentMarker() {
    return this.marker;
  }

  public setDestinationMarker(marker: google.maps.Marker) {
    this.destinationMarker = marker;
  }

  public getDestinationMarker() {
    return this.destinationMarker;
  }
}
