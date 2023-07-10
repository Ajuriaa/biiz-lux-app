import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { HeaderComponent, ProfileHeaderComponent } from './components';

@NgModule({
  declarations: [HeaderComponent, ProfileHeaderComponent],
  exports: [HeaderComponent, ProfileHeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class HeaderModule { }
