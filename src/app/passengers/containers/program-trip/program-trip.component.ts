import { Component } from '@angular/core';

@Component({
  selector: 'app-program-trip',
  templateUrl: './program-trip.component.html',
  styleUrls: ['./program-trip.component.scss']
})
export class ProgramTripComponent {
  showCalendar = false;

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }
}
