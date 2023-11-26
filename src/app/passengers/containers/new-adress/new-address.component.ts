import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService, RouterService, SharedDataService } from 'src/app/core/services';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { AddressMutations } from '../../services';
import { IAddress } from '../../interfaces';

const ICON_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/plus.png';
const LOGO_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/atlantis-logo-white.png';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit, OnDestroy {
  public addresses: IAddress[] = [];
  public iconUrl = ICON_URL;
  public logoUrl = LOGO_URL;
  public autocompleteAddresses: any = [];
  public autocomplete = { input: ''};
  public weatherImage = '';
  public temperature = 0;
  public addressName = '';
  public map!: google.maps.Map;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;

  constructor(
    private sharedDataService: SharedDataService,
    private _addressMutation: AddressMutations,
    private _routerService: RouterService,
    private mapService: MapService
  ){}

  async ngOnInit(): Promise<void> {
    this.currentCoordinates = await this.sharedDataService.setDefaultCoordinates();
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    const marker = this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.passenger, true);
    this.sharedDataService.setCurrentMarker(marker);
    this.autocomplete.input = await this.mapService.getPlaceFromCoordinate(this.currentCoordinates);
  }

  ngOnDestroy(): void {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
  }

  public async SelectSearchResult(address: string): Promise<void> {
    const addressCoordinates = await this.mapService.getCoordinateFromPlace(address);
    this.mapService.removeMarker(this.sharedDataService.getCurrentMarker());
    const marker = this.mapService.addMarker(addressCoordinates, this.map, MarkerUrl.passenger, true);
    this.sharedDataService.setCurrentMarker(marker);
    this.autocomplete.input = address;
    this.autocompleteAddresses = [];
    this.map.setZoom(13);
    const markerCords = { lat: marker?.getPosition()?.lat() || 0, lng: marker?.getPosition()?.lng() || 0};
    setTimeout(() => {
      this.map.panTo(markerCords);
    }, 350);
    this.map.setZoom(17);
  }

  public UpdateSearchResults() {
    this.mapService.placesSearchResult(this.autocomplete).then((predictions) => {
      this.autocompleteAddresses = predictions;
    });
  }

  public ClearAutocomplete(): void {
    this.autocompleteAddresses = [];
    this.autocomplete.input = '';
  }

  public async saveAddress(): Promise<void> {
    const marker = this.sharedDataService.getCurrentMarker().getPosition();
    const latitude = marker?.lat() || 0;
    const longitude = marker?.lng() || 0;
    const address: IAddress = {
      name: this.addressName,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      primary: false,
      address: this.autocomplete.input
    };

    const mutationRespone = await this._addressMutation.createAddress(address);

    if (mutationRespone) {
      this._routerService.transition('/passenger/address');
    }
  }
}
