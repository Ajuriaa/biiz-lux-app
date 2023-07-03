import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { FaqComponent } from '.';

@NgModule({
  declarations: [FaqComponent],
  exports: [FaqComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule
  ]
})
export class FaqModule { }
