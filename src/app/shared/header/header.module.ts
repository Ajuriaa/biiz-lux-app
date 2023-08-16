import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent, ProfileHeaderComponent } from './components';


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
