import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
  @Input() value = '';
  @Input() selectedValue = '';
  @Output() changeSelected = new EventEmitter<string>();

  changeSelectedOption() {
    this.changeSelected.emit(this.value);
  }
}
