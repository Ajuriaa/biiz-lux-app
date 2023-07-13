import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['../base-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() public styleClass = 'btn-black';
  @Input() public disableButton = false;
  @Output() public btnClick = new EventEmitter();
  @Input() showNotification = false;
}
