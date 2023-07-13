import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const API_KEY = 'AIzaSyBOmdqASwwGxnxF2V-30nV98G1f32042Ng';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
})
export class MapsComponent {
  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`, 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }
}
