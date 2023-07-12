import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { 
  PrimaryButtonComponent,
  ToggleButtonComponent,
  DisplayButtonComponent,
  WhiteButtonComponent
} from './components';

@NgModule({
  declarations: [
    PrimaryButtonComponent,
    ToggleButtonComponent,
    DisplayButtonComponent,
    WhiteButtonComponent
  ],
  exports: [
    PrimaryButtonComponent,
    ToggleButtonComponent,
    DisplayButtonComponent,
    WhiteButtonComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class ButtonsModule {}
