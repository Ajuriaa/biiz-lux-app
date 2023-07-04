import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimaryButtonComponent, ToggleButtonComponent, DisplayButtonComponent } from './components';

@NgModule({
  declarations: [
    PrimaryButtonComponent,
    ToggleButtonComponent,
    DisplayButtonComponent
  ],
  exports: [
    PrimaryButtonComponent,
    ToggleButtonComponent,
    DisplayButtonComponent
  ],
  imports: [CommonModule, RouterModule],
})
export class ButtonsModule {}
