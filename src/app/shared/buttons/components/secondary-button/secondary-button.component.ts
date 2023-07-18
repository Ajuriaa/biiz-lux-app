import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss']
})
export class SecondaryButtonComponent {
  @Input() public styleClass = 'btn-black';
  @Input() public disableButton = false;
  @Output() public btnClick = new EventEmitter();
  @Input() showNotification = false;
}
