import { Component } from '@angular/core';
import { NetworkService, ConnectionStatus } from '../../services/network/network.service';
import { ToastModule } from '../../modules/toast/toast.module';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.page.html',
  styleUrls: ['./send-email.page.scss'],
})
export class SendEmailPage {

  constructor(public networkService: NetworkService, public alertModule: ToastModule) {
  }

  sendEmail(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      console.log(val);
    } else {
      this.alertModule.showToastWithDuration('You are offline', 'top', 5000);
    }
  }
}
