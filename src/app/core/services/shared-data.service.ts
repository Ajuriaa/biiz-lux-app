import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ICoordinate } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private coordinates = { lat: 0, lng: 0 };
  private closestDriverCoordinates = [{ lat: 0, lng: 0 }];
  private marker = new google.maps.Marker();
  private destinationMarker = new google.maps.Marker();

  public async setDefaultCoordinates(): Promise<ICoordinate> {
    const coords = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });
    this.coordinates= { lat: coords.coords.latitude, lng: coords.coords.longitude };
    return this.coordinates;
  }

  public getCoordinates() {
    return this.coordinates;
  }

  public setDriverCoordinates(coordinates: ICoordinate[]) {
    this.closestDriverCoordinates = coordinates;
  }

  public getDriverCoordinates() {
    return this.closestDriverCoordinates;
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
