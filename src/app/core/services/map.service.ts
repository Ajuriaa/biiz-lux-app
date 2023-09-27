import { ElementRef, Injectable, NgZone } from '@angular/core';
import { ICoordinate } from '../interfaces';
import { getCloseDrivers } from '../helpers';
import { MarkerUrl } from '../enums';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public GoogleAutocomplete: google.maps.places.AutocompleteService;
  public directionsRenderer: google.maps.DirectionsRenderer;
  public directionsService: google.maps.DirectionsService;
  public geocoder: google.maps.Geocoder;

  constructor(
    private sharedDataService: SharedDataService,
    private zone: NgZone
  )
  {
    const directionOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: { strokeColor: '#00E741' },
      suppressMarkers: true
    };
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer(directionOptions);
    this.geocoder = new google.maps.Geocoder();
  }

  public generateDefaultMap(coords: ICoordinate, mapRef: ElementRef) {
    const mapOptions: google.maps.MapOptions = {
      mapId: 'f8e6a2472dfc90b0',
      center: coords,
      zoom: 17,
      clickableIcons: false,
      disableDefaultUI: true,
      keyboardShortcuts: false,
      gestureHandling: 'greedy'
    };
    return new google.maps.Map(mapRef.nativeElement, mapOptions);
  }

  public addMarker(coordinates: ICoordinate, map: google.maps.Map, markerUrl: string, draggable = false): google.maps.Marker {
    const marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      draggable: draggable,
      icon: {
        // TODO: add custom icon options for driver markers
        url: markerUrl,
        scaledSize: new google.maps.Size(50, 50)
      }
    });
    return marker;
  }

  public removeMarker(marker: google.maps.Marker): void {
    marker.setMap(null);
  }

  public placesSearchResult(autocomplete: { input: string }): Promise<any[]> {
    return new Promise<any[]>((resolve) => {
      const input = autocomplete.input;

      if (input === '') {
        resolve([]);
      } else {
        this.GoogleAutocomplete.getPlacePredictions({ input: input + 'Tegucigalpa, Honduras' }, (predictions: any) => {
          const addressesArray = predictions || [];
          resolve(addressesArray);
        });
      }
    });
  }

  public renderRoute(start: ICoordinate, end: ICoordinate, map: google.maps.Map) {
    const request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode['DRIVING']
    };
    this.directionsRenderer.setMap(map);
    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  }

  public markDrivers(passengerCoordinates: ICoordinate, driversCoordinates: ICoordinate[], map: google.maps.Map): void {
    const driversCoords = getCloseDrivers(passengerCoordinates, driversCoordinates);
    const markerType = MarkerUrl.driver;
    for (const driverCoords of driversCoords) {
      this.addMarker(driverCoords, map, markerType);
    }
  }

  public getCoordinateFromPlace(address: string): Promise<ICoordinate> {
    return new Promise<ICoordinate>((resolve, reject) => {
      const options: google.maps.GeocoderRequest = {
        address: address,
        language: 'es',
        region: 'HN'
      };

      this.geocoder.geocode(options, (results, status) => {
        if (status === 'OK' && results) {
          const coord = results[0].geometry.location;
          const coordinates: ICoordinate = { lat: coord.lat(), lng: coord.lng() };
          resolve(coordinates);
        } else {
          reject(new Error(`Geocoding failed with status: ${status}`));
        }
      });
    });
  }

  public getPlaceFromCoordinate(coordinate: ICoordinate): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const options: google.maps.GeocoderRequest = {
        language: 'es',
        region: 'HN',
        location: coordinate
      };

      this.geocoder.geocode(options, (results, status) => {
        if (status === 'OK' && results) {
          const address = results[0].formatted_address;
          console.log(address);
          resolve(address);
        } else {
          reject(new Error(`Reverse geocoding failed with status: ${status}`));
        }
      });
    });
  }
}
