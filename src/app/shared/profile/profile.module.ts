import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components';




@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ProfileModule { }