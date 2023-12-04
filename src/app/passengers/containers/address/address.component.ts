import { Component, OnInit } from '@angular/core';
import { WeatherQueries } from 'src/app/shared/services';
import { RouterService } from 'src/app/core/services';
import { AddressQueries } from '../../services';
import { IAddress } from '../../interfaces';

const ICON_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/plus.png';
const LOGO_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/atlantis-logo-white.png';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public addresses: IAddress[] = [];
  public iconUrl = ICON_URL;
  public logoUrl = LOGO_URL;
  public weatherImage = '';
  public temperature = 0;

  constructor(
    private _addressQuery: AddressQueries,
    private _weatherQuery: WeatherQueries,
    private _routerService: RouterService
  ){}

  ngOnInit(): void {
    this._addressQuery.getUserAddresses().subscribe(({ data }) => {
      if (data) {
        this.addresses = data.addresses || [];
      }
    });
    this._weatherQuery.getWeatherData().subscribe(({ data }) => {
      if (data) {
        this.weatherImage = this._setWeatherImage(data.weather.weather[0].icon);
        this.temperature = Math.round(data.weather.main.temp);
      }
    });
  }

  public goToPath(path: string): void {
    this._routerService.transition(path);
  }

  private _setWeatherImage(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
  }
}
