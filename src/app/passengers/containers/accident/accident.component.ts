import { Component } from '@angular/core';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss'],
})
export class AccidentComponent {
  gotHurt = false;
  message = '';

  updateGotHurt(value: boolean) {
    if (value) {
      this.gotHurt = true;
    } else {
      this.gotHurt = false;
    }
  }
}
