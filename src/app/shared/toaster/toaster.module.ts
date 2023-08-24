import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ToastComponent } from './components/toaster.component';

@NgModule({
  declarations: [ToastComponent],
  exports: [ToastComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [ToastComponent]
})
export class ToasterModule { }
