import { Component } from '@angular/core';
import { CallApiService } from '../../services/call-api/call-api.service';
import { NavController } from '@ionic/angular';
import { ToastModule } from '../../modules/toast/toast.module';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.page.html',
  styleUrls: ['./finish-order.page.scss'],
})
export class FinishOrderPage {

  public newOrder = {
    notes: '',
    order_Type: '',
    reqDate: ''
  };
  public update_custData: any;
  constructor(public service: CallApiService, public navCtrl: NavController,public alertModule: ToastModule) {
    this.service.getspecificorderDetail(localStorage.current_OrderNumber).then((response: any) => {
      this.update_custData = response;
      this.newOrder.notes = response.Notes;
      this.newOrder.reqDate = response.ReqdDate
    });
   }

   updateRecord(){
    this.update_custData.Notes = this.newOrder.notes === "" ? null : this.newOrder.notes;
    this.update_custData.ReqdDate = this.newOrder.reqDate;

    this.service.setAllOrder(this.update_custData).then((response: any) => {
      if (response === 'success') {
        this.alertModule.showToastWithDuration('Order updated successfully', 'top', 5000);
        this.navCtrl.navigateRoot(['home']);
      }
    });

  }
}
