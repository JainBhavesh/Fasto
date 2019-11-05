import { Component } from '@angular/core';
import * as moment from 'moment';
import { Events, NavController } from '@ionic/angular';
import { CallApiService } from '../../services/call-api/call-api.service';
import { environment } from '../../../environments/environment';
import { ToastModule } from './../../modules/toast/toast.module';
import { NetworkService } from '../../services/network/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public checkTime: any = '';
  public userDetails: any = undefined;
  public orderDetailsData: any = [];
  constructor(public networkService: NetworkService,
    public showToast: ToastModule,
    public navCtrl: NavController,
    public event: Events,
    public service: CallApiService) {

  }

  ionViewWillEnter() {
    const time = moment().format('HH');
    if (time >= '00' && time <= '05') {
      this.checkTime = 'Good night';
    } else if (time >= '05' && time <= '12') {
      this.checkTime = 'Good morning';
    } else if (time >= '12' && time <= '17') {
      this.checkTime = 'Good afternoon';
    } else if (time >= '17' && time <= '23') {
      this.checkTime = 'Good evening';
    }

    if (localStorage.loginUserDetails === undefined || localStorage.loginUserDetails === null) {
      this.userDetails = undefined;
    } else {
      this.userDetails = JSON.parse(localStorage.loginUserDetails);
    }

    if (localStorage.allOrder !== undefined) {
      this.orderDetailsData = this.service.getAllOrder();
    }

    this.service.showHideMenu('Home');
    localStorage.removeItem('current_OrderNumber');
    this.callAPI();
    this.storeCompanyInfo();
    this.storeorderTypeInfo();
    this.storeswapmerge();
  }

  storeCompanyInfo() {
    if (localStorage.companyInfo === undefined) {
      this.service.hitAPICall('get', environment.baseURL + 'download/companyinfo', '').subscribe((response: any) => {
        localStorage.companyInfo = JSON.stringify(response);
      }, error => {
        console.log(error);
      });
    }
  }
  
  storeorderTypeInfo() {
    if (localStorage.orderTypeInfo === undefined) {
      this.service.hitAPICall('get', environment.baseURL + 'download/ordertypes', '').subscribe((response: any) => {
        localStorage.orderTypeInfo = JSON.stringify(response);
      });
    }
  }
  
  storeswapmerge() {
    if (localStorage.swapmergeInfo === undefined) {
      this.service.hitAPICall('get', environment.baseURL + 'download/productsswapmerge', '').subscribe((response: any) => {
        localStorage.swapmergeInfo = JSON.stringify(response);
      });
    }
  }
  
  orderDetails(val: any) {
    this.service.showHideMenu('View details').then((value: any) => {
      if (value === 'success') {
        localStorage.current_OrderNumber = val.OrderNo;
        this.navCtrl.navigateRoot(['show-items']);
      }
    });
  }

  callAPI() {
    if (localStorage.product_customer !== 'true') {
      this.showToast.showAlert('You must perform a complete synchronization before you can take orders.', 'OK', (callBack: any) => {
        if (callBack === 'Yes') {
          this.service.showLoader();
          this.service.callTwoAPI('get', [environment.baseURL + 'download/products', environment.baseURL + 'download/customers'], '').subscribe((response: any) => {
            if (response[0].length !== 0) {
              this.service.storeProducts_data(response[0]);
              this.service.hideLoader();
              localStorage.product_customer = 'true';
            }

            if (response[1].length !== 0) {
              this.service.storeCustomers_data(response[1]);
            }
          }, error => {
            this.service.hideLoader();
          });
        } else {
          localStorage.product_customer = 'false';
        }
      });
    }
  }
}
