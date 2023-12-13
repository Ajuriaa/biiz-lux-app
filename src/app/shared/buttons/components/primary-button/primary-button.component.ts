import { Component, EventEmitter, Input, Output } from '@angular/core';

const LOGO_LINK = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-blue.png';
@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['../base-button.component.scss']
})
export class PrimaryButtonComponent {
  public logoUrl = LOGO_LINK;
  @Input() public styleClass = 'btn-black';
  @Input() public disableButton = false;
  @Input() public showNotification = false;
  @Input() public showLogo = false;
  @Output() public btnClick = new EventEmitter();
}
