// shared-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private coordinates = { latitude: 0, longitude: 0 };

  public setCoordinates(coordinates: {latitude: number, longitude: number}) {
    this.coordinates = coordinates;
  }

  public getCoordinates() {
    return this.coordinates;
  }
}
