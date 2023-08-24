import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html'
})

export class ToastComponent {
  constructor(private toastController: ToastController) {}

  private async _baseToast(message: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color,
      icon
    });

    await toast.present();
  }

  public async errorToast(message: string) {
    await this._baseToast(message, 'danger', 'alert-circle-outline');
  }

  public async successToast(message: string) {
    await this._baseToast(message, 'success', 'checkmark-circle-outline');
  }
}
