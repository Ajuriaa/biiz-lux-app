import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  template: `
    <label class="radio-label">
      <input type="radio" [value]="value" [name]="name" [checked]="value" class="green-radio">
      {{ label }}
    </label>
  `,
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
  @Input() label = '';
  @Input() value: any = '';
  @Input() name = '';
}
