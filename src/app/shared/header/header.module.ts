import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { HeaderComponent, ProfileHeaderComponent } from './components';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HeaderComponent, ProfileHeaderComponent],
  exports: [HeaderComponent, ProfileHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot()
  ]
})
export class HeaderModule { }
