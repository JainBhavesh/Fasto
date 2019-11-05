import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CallApiService } from './services/call-api/call-api.service';
import { environment } from '../environments/environment';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages: any = [];

  public productsData: any = [];
  public customersData: any = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public event: Events,
    public service: CallApiService,
    public device: Device) {
    this.checkMenu();
    this.initializeApp();
    this.event.unsubscribe('checkMenu');
    this.event.subscribe('checkMenu', () => {
      this.checkMenu();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      localStorage.deviceUUID = this.device.uuid;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkMenu() {
    this.appPages = [{
      title: 'Home',
      url: '/home',
      login: localStorage.homePage === 'true' ? true : false,
      src: '../assets/Images/menuIcon/Home.png'
    }, {
      title: 'New Order',
      url: '/new-order',
      login: localStorage.newOrderPage === 'true' ? true : false,
      src: '../assets/Images/menuIcon/newSalesOrder.png'
    }, {
      title: 'Upload Orders',
      url: '/upload-order',
      login: localStorage.uploadOrderPage === 'true' ? true : false,
      src: '../assets/Images/menuIcon/Upload.png'
    }, {
      title: 'View header',
      url: '/new-order',
      login: localStorage.viewHeaderPage === 'true' ? true : false,
      src: '../assets/Images/menuIcon/orderHeader.png'
    }, {
      title: 'View details',
      url: '/show-items',
      login: localStorage.viewDetailsPage === 'true' ? true : false,
      src: '../assets/Images/menuIcon/orderDetails.png'
    }, 
    // {
    //   title: 'Send by email',
    //   url: '/send-email',
    //   login: localStorage.sendByEmailPage === 'true' ? true : false,
    //   src: '../assets/Images/menuIcon/sendEmail.png'
    // }, {
    //   title: 'Print as PDF',
    //   url: '/print-pdf',
    //   login: localStorage.printPage === 'true' ? true : false,
    //   src: '../assets/Images/menuIcon/print.png'
    // }, 
    {
      title: 'Product search',
      url: '/product-search',
      login: localStorage.productSearchPage === 'true' ? true : false,
      src: '../assets/Images/menuIcon/search.png'
    }, {
      title: 'Finish order',
      url: '/finish-order',
      login: localStorage.finishOrderPage === 'true' ? true : false,
      src: '../assets/Images/menuIcon/finishOrder.png'
    }, {
      title: 'Sign out',
      url: '/login',
      icon: '',
      login: localStorage.isLogin === 'true' ? true : false,
      src: '../assets/Images/menuIcon/signout.png'
    }];
  }

  signOut() {
    const userDetails = JSON.parse(localStorage.loginUserDetails);
    this.service.hitAPICall('delete', environment.baseURL + 'login/' + userDetails.UserID, '').subscribe((response: any) => {
      localStorage.removeItem('current_OrderNumber');
      localStorage.isLogin = false;
      localStorage.removeItem('loginUserDetails');
    });
  }

  refreshMenu(menuTitle: any) {
    this.service.showHideMenu(menuTitle).then((value: any) => {
      if (value === 'success') {
        this.checkMenu();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
