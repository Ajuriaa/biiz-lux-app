import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ICoordinate, IDriver } from '../interfaces';
import { DEFAULT_COORDS } from '../constants';
import { MapService } from './map.service';

interface ICurrentTrip {
  passengerId: string;
  tripId: string;
}
@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private coordinates = DEFAULT_COORDS;
  private closeDriversCoordinates: ICoordinate[] = [];
  private closeDrivers : IDriver[] = [{id : 0, coordinates : DEFAULT_COORDS, eta: 0}];
  private marker = new google.maps.Marker();
  private eta = 0;
  private destinationMarker = new google.maps.Marker();
  private currentTrip: ICurrentTrip = {passengerId: '0', tripId: '0'};
  private driverCoords: ICoordinate = DEFAULT_COORDS;
  private driverArrived = false;
  private tripFinished = false;
  private batteryLevel = 0;
  private globalEta = 0;
  private globalDistance = 0;
  private passenderCoords = DEFAULT_COORDS;
  private tripFare = 0;

  constructor(private mapService: MapService) {}

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

  public setDriverCoord(coords: ICoordinate): void {
    this.driverCoords = coords;
  }

  public getDriverCoord(): ICoordinate {
    return this.driverCoords;
  }

  public setDriverArrived(arrived: boolean): void {
    this.driverArrived = arrived;
  }

  public getDriverArrived(): boolean {
    return this.driverArrived;
  }

  public setFinishTrip(arrived: boolean): void {
    this.tripFinished = arrived;
  }

  public getFinishTrip(): boolean {
    return this.tripFinished;
  }

  public async setEta(): Promise<void> {
    this.eta = await this.mapService.getEstimatedTime(this.getDriverCoord(), this.coordinates);
  }

  public getEta(): number {
    return this.eta;
  }

  public setBatteryLevel(level: number): void {
    this.batteryLevel = level;
  }

  public getBatteryLevel(): number {
    return this.batteryLevel;
  }

  public setGlobalEta(eta: number): void {
    this.globalEta = eta;
  }

  public getGlobalEta(): number {
    return this.globalEta;
  }

  public setGlobalDistance(distance: number): void {
    this.globalDistance = distance;
  }

  public getGlobalDistance(): number {
    return this.globalDistance;
  }

  public setPassengerCoords(coords: ICoordinate): void {
    this.passenderCoords = coords;
  }

  public getPassengerCoords(): ICoordinate {
    return this.passenderCoords;
  }

  public setTripFare(fare: number): void {
    this.tripFare = fare;
  }

  public getTripFare(): number {
    return this.tripFare;
  }

  public resetData(): void {
    this.coordinates = DEFAULT_COORDS;
    this.closeDriversCoordinates = [];
    this.closeDrivers = [{id : 0, coordinates : DEFAULT_COORDS, eta: 0}];
    this.marker = new google.maps.Marker();
    this.destinationMarker = new google.maps.Marker();
    this.driverCoords = DEFAULT_COORDS;
    this.driverArrived = false;
    this.tripFinished = false;
    this.batteryLevel = 0;
    this.globalEta = 0;
    this.globalDistance = 0;
    this.passenderCoords = DEFAULT_COORDS;
    this.tripFare = 0;
  }

  public resetCurrentTrip(): void {
    this.currentTrip = {passengerId: '0', tripId: '0'};
  }
}
