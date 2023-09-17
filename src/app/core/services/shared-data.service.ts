// shared-data.service.ts
import { Injectable } from '@angular/core';
import { ICoordinate } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private coordinates = { latitude: 0, longitude: 0 };
  private markerId = '';

  public setCoordinates(coordinates: ICoordinate) {
    this.coordinates = coordinates;
  }

  public getCoordinates() {
    return this.coordinates;
  }

  public setCurrentMarkerId(markerId: string) {
    this.markerId = markerId;
  }

  public getCurrentMarkerId() {
    return this.markerId;
  }
}
