import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimaryButtonComponent, ToggleButtonComponent } from './components';

@NgModule({
  declarations: [
    PrimaryButtonComponent,
    ToggleButtonComponent
  ],
  exports: [
    PrimaryButtonComponent,
    ToggleButtonComponent
  ],
  imports: [CommonModule, RouterModule],
})
export class ButtonsModule {}
