import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { 
  PrimaryButtonComponent,
  SecondaryButtonComponent,
  ToggleButtonComponent,
  DisplayButtonComponent,
  WhiteButtonComponent
} from './components';


@NgModule({
  declarations: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    ToggleButtonComponent,
    DisplayButtonComponent,
    WhiteButtonComponent
  ],
  exports: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    ToggleButtonComponent,
    DisplayButtonComponent,
    WhiteButtonComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class ButtonsModule {}
