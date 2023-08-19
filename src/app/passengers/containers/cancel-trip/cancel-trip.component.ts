import { Component } from '@angular/core';

@Component({
  selector: 'app-cancel-trip',
  templateUrl: './cancel-trip.component.html',
  styleUrls: ['./cancel-trip.component.scss']
})
export class CancelTripComponent {
  options: string[] = [
    'No lo diré',
    'No pude contactar al chofer',
    'El Chofer llegó tarde',
    'Precio del servicio',
    'El lugar de recogida era incorrecto'];
  selectedValue ='No lo diré';
  message = '';
}
