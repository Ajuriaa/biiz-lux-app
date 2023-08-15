import { Component } from '@angular/core';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent {
  gotHurt = false;
  message = '';

  public updateGotHurt(value: boolean) {
    this.gotHurt = value;
  }
}
