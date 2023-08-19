import { Component } from '@angular/core';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent {
  options: string[] = ['SI', 'NO'];
  selectedValue = 'NO';
  message = '';

  changeSelectedValue(newValue: string) {
    this.selectedValue = newValue;
  }
}
