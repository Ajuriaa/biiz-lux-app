import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { ProfileComponent } from './components';

@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    ButtonsModule
  ]
})
export class ProfileModule { }
