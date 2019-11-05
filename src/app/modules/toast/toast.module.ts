import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastController, AlertController } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ToastModule {

  constructor(public toastController: ToastController, public alertController: AlertController) { }
  /**
   *
   * @param {string} val_message display message
   // tslint:disable-next-line: jsdoc-format
  * @param {*} val_position set position top/bottom
  * @param {number} val_duration set duration
  * @memberof ToastModule
  */
 // tslint:disable-next-line: variable-name
  showToastWithDuration(val_message: string, val_position: any, val_duration: number) {
    this.toastController.create({
      message: val_message,
      position: val_position,
      duration: val_duration
    }).then((toast: any) => {
      toast.present();
    });
  }

  /**
   *
   * @param {string} val_message display message
   * @param {*} val_position set position top/bottom
   * @param {*} callback_func Cal back function return Yes
   * @memberof ToastModule
   */
  // tslint:disable-next-line: variable-name
  showToastWithButton(val_message: string, val_position: any, callback_func: any) {
    this.toastController.create({
      message: val_message,
      position: val_position,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            callback_func('Yes');
          }
        }
      ]
    }).then((toast: any) => {
      toast.present();
    });
  }

  /**
   *
   * @param {string} val_message display message
   * @param {*} val_button button name
   * @param {*} callBack_func Return function Yes
   * @memberof AlertModule
   */

  // tslint:disable-next-line: variable-name
  showAlert(val_message: string, val_button: any, callBack_func: any) {
    this.alertController.create({
      header: 'FASTo',
      message: val_message,
      mode: 'ios',
      buttons: [
        {
          text: val_button,
          handler: () => {
            callBack_func('Yes');
          }
        }
      ]
    }).then((alert: any) => {
      alert.present();
    });
  }

  /**
   *
   * @param {string} val_message display message
   * @param {*} val_button button name ['No','Yes']
   * @param {*} callBack_func Return function Yes/No
   * @memberof AlertModule
   */
  // tslint:disable-next-line: variable-name
  showConfirm(val_message: string, val_button: any, callBack_func: any) {
    this.alertController.create({
      header: 'FASTo',
      message: val_message,
      mode: 'ios',
      buttons: [
        {
          text: val_button[0],
          role: 'cancel',
          handler: () => {
            callBack_func('No');
          }
        },
        {
          text: val_button[1],
          handler: () => {
            callBack_func('Yes');
          }
        }
      ]
    }).then((confirm: any) => {
      confirm.present();
    });
  }
}
