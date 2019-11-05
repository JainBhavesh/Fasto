import { ToastModule } from './../../modules/toast/toast.module';
import { Component } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { CallApiService } from '../../services/call-api/call-api.service';
import { environment } from '../../../environments/environment';
import { NetworkService, ConnectionStatus } from '../../services/network/network.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public passCode: any = [];
  public customVal: any;

  constructor(public networkService: NetworkService,
    public service: CallApiService,
    public event: Events,
    public alertModule: ToastModule,
    public navCtrl: NavController) { }

  checkActive(val: any) {
    if (this.passCode.indexOf(val) !== -1) {
      return true;
    }
  }

  login(val: any) {
    if (this.passCode.length < 4) {
      this.customVal = val;
      this.passCode.push(val);
      if (this.passCode.length === 4) {
        if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
          const convertStr = this.passCode.toString();
          const replaceStr = convertStr.replace(/,/g, '');
          const loginData = {
            MobilePIN: replaceStr,
            DeviceID: localStorage.deviceUUID
          };
          this.service.showLoader();
          this.service.hitAPICall('post', environment.baseURL + 'login', loginData).subscribe((response: any) => {
            this.passCode = [];
            if (response.Number) {
              this.alertModule.showAlert(response.Message, 'OK', () => {
              });
            } else {
              localStorage.loginUserDetails = JSON.stringify(response);
              localStorage.isLogin = true;
              this.service.showHideMenu('Home').then((value: any) => {
                if (value === 'success') {
                  this.navCtrl.navigateRoot(['home']);
                }
              });
            }
            this.service.hideLoader();
          }, error => {
            this.service.hideLoader();
            this.alertModule.showAlert('Something is wrong. Please try again in a few minutes', 'OK', () => {
              this.passCode = [];
            });
          });
        } else {
          this.alertModule.showToastWithDuration('You are offline', 'top', 5000);
        }
      }
    }
  }
}
