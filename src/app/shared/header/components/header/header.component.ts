import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherQueries } from 'src/app/shared/services';

const DEFAULT_WEATHER_IMAGE = 'assets/images/weather.svg';
@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public weatherImage = DEFAULT_WEATHER_IMAGE;

  constructor(
    private _router: Router,
    private _location: Location,
    private _weatherQuery: WeatherQueries
  ) {}


  ngOnInit(): void {
    this._weatherQuery.getWeatherData().subscribe(({ data }) => {
      if (data) {
        this.weatherImage = data.weather.weather[0].iconUri;
      }
    });
  }

  public navigate(): void {
    this._router.navigateByUrl('passenger/home');
  }

  public isProfileRoute(): boolean {
    return this._router.url.includes('profile');
  }

  public goToPreviousPage(): void {
    this._location.back();
  }
}
