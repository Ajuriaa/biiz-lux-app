import { Component } from '@angular/core';

@Component({
  selector: 'app-cancel-trip',
  templateUrl: './cancel-trip.component.html',
  styleUrls: ['./cancel-trip.component.scss']
})
export class CancelTripComponent {
  option = false;
  message = '';
}
