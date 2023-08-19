import { Component } from '@angular/core';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent {
  gothurt: string[] = ['SI,','NO'];
  selectedValue ='NO';
  message = '';

}
