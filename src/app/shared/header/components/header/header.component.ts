import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherQueries } from 'src/app/shared/services';

const DEFAULT_WEATHER_IMAGE = 'assets/images/weather.svg';
const TRANSPARENT_HEADER_ROUTES = ['trip', 'customer-service', 'awaiting-trip', 'traveling'];
@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public weatherImage = DEFAULT_WEATHER_IMAGE;
  public whiteHeader = false;
  private allowedRoutes = TRANSPARENT_HEADER_ROUTES;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location,
    private _weatherQuery: WeatherQueries
  ) {}


  ngOnInit(): void {
    this.whiteHeader = !this.allowedRoutes.includes(this._route.snapshot.url.join('/'));
    this._weatherQuery.getWeatherData().subscribe(({ data }) => {
      if (data) {
        this.weatherImage = this._setWeatherImage(data.weather.weather[0].icon);
      }
    });
  }

  public navigate(path: string): void {
    this._router.navigateByUrl('passenger/' + path);
  }

  public isProfileRoute(): boolean {
    return this._router.url.includes('profile');
  }

  public goToPreviousPage(): void {
    this._location.back();
  }

  private _setWeatherImage(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
