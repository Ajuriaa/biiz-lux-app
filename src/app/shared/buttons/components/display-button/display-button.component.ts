import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-button',
  templateUrl: './display-button.component.html',
  styleUrls: ['./display-button.component.scss']
})
export class DisplayButtonComponent {
  @Input() label = '';
  @Input() routerLink = '';
}
