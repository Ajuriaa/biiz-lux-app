import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { IUser } from 'src/app/passengers/interfaces';
import { ICoordinate, IDriver } from '../interfaces';
import { DEFAULT_COORDS, USER } from '../constants';

interface ICurrentTrip {
  passengerId: string;
  tripId: string;
};
@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private coordinates = DEFAULT_COORDS;
  private closeDriversCoordinates: ICoordinate[] = [];
  private closeDrivers : IDriver[] = [{id : 0, coordinates : DEFAULT_COORDS}];
  private marker = new google.maps.Marker();
  private destinationMarker = new google.maps.Marker();
  private currentTrip: ICurrentTrip = {passengerId: '0', tripId: '0'}

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

  public setDriverCoordinates(drivers: IDriver[]) {
    this.closeDrivers = drivers;
    this.closeDriversCoordinates = this.closeDrivers.map(driver => driver.coordinates);
  }

  public getDrivers() {
    return this.closeDrivers;
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

  public getDriverCoordinates() {
    return this.closeDriversCoordinates;
  }

  public setCurrentTrip(trip: ICurrentTrip) {
    this.currentTrip = trip;
  }

  public getCurrentTrip(): ICurrentTrip {
    return this.currentTrip;
  }
}
