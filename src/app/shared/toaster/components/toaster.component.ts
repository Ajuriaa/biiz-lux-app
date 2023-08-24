import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html'
})

export class ToastComponent {
  constructor(private toastController: ToastController) {}
  public toastMessage = '';

  public async errorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: 'danger',
      icon: 'alert-circle-outline'
    });

    await toast.present();
  }

  public async successToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: 'sucess',
      icon: 'checkmark-circle-outline'
    });

    await toast.present();
  }
}
