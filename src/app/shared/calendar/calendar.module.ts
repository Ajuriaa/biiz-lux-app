import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './components/calendar.component';
import { MaterialModule } from 'src/app/material';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class CalendarModule { }
