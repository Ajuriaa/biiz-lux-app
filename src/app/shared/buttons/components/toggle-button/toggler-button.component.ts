import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {
  @Input() checked = false;
  @Input() label = '';

  public toggle() {
    this.checked = !this.checked;
  }
}
