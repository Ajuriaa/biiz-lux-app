import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  PrimaryButtonComponent,
  SecondaryButtonComponent,
  ToggleButtonComponent,
  DisplayButtonComponent,
  WhiteButtonComponent,
  RadioButtonComponent
} from './components';

@NgModule({
  declarations: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    ToggleButtonComponent,
    DisplayButtonComponent,
    WhiteButtonComponent,
    RadioButtonComponent
  ],
  exports: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    ToggleButtonComponent,
    DisplayButtonComponent,
    WhiteButtonComponent,
    RadioButtonComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class ButtonsModule {}
