import { Component } from '@angular/core';
import { ToastModule } from '../../modules/toast/toast.module';
import { NetworkService, ConnectionStatus } from '../../services/network/network.service';
import { CallApiService } from '../../services/call-api/call-api.service';
import { NavController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-order',
  templateUrl: './upload-order.page.html',
  styleUrls: ['./upload-order.page.scss'],
})
export class UploadOrderPage {
  public orderDetailsData: any = [];
  constructor(public navCtrl: NavController,
    public service: CallApiService,
    public networkService: NetworkService,
    public alertModule: ToastModule) {
  }

  ionViewWillEnter() {
    if (localStorage.allOrder !== undefined) {
      this.orderDetailsData = this.service.getAllOrder();
      if (this.orderDetailsData.length === 0) {
        this.navCtrl.navigateRoot(['home']);
      }
    } else {
      this.navCtrl.navigateRoot(['home']);
    }
  }

  upload_Order(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      if (val === "allUpload") {
        this.service.showLoader();
        this.service.hitAPICall('post', environment.baseURL + 'orders', this.orderDetailsData).subscribe((response: any) => {
          this.service.hideLoader();
          this.alertModule.showToastWithDuration('Orders uploaded successfully','top',5000);
          let getAllRecord = JSON.parse(localStorage.allOrder);
          let setindex = getAllRecord.findIndex((e) => e.userID == this.orderDetailsData.userID);
          getAllRecord.splice(setindex, 1);
          if (getAllRecord.length == 0) {
            localStorage.removeItem('allOrder');
          } else {
            localStorage.allOrder = JSON.stringify(getAllRecord);
          }
        }, error => {
          this.service.hideLoader();
          console.log(error);
        });
      } else {
        this.service.showLoader();
        this.service.hitAPICall('post', environment.baseURL + 'orders/' + val.OrderID, val).subscribe((response: any) => {
          this.service.removeOrder(val.OrderNo).then(response_return => {
            if (response_return == "success") {
              this.service.hideLoader();
              this.alertModule.showToastWithDuration('Order uploaded successfully','top',5000);
              this.ionViewWillEnter();
            }else{
              this.service.hideLoader();
            }
          });
        }, error => {
          console.log(error);
          this.service.hideLoader();
        });
      }
    } else {
      this.alertModule.showToastWithDuration('You are offline', 'top', 5000);
    }
  }
}
