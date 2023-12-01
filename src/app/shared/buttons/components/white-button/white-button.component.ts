import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-white-button',
  templateUrl: './white-button.component.html',
  styleUrls: ['./white-button.component.scss']
})
export class WhiteButtonComponent {
  @Input() message = '';
  @Input() showNotification = false;
  @Input() isGreen = false;
}
