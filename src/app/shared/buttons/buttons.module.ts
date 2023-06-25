import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from './components';

@NgModule({
  declarations: [
    PrimaryButtonComponent
  ],
  exports: [
    PrimaryButtonComponent
  ],
  imports: [CommonModule, RouterModule],
})
export class ButtonsModule {}
