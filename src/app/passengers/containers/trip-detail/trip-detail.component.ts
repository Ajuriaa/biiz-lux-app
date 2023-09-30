import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent {

  constructor(
    private _router: Router
  ){}

  public goHome(){
    this._router.navigate(['/passenger/home']);
  }
}
