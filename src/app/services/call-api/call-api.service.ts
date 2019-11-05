import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, Events } from '@ionic/angular';
import * as $ from 'jquery';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { ToastModule } from '../../modules/toast/toast.module';
@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(public toast: ToastModule, public storage: Storage, public event: Events, public http: HttpClient, public platform: Platform) { }

  /**
   * Show Loader
   *
   * @memberof ApiService
   */
  showLoader() {
    $('.loader').show();
  }

  /**
   * Hide Loader
   *
   * @memberof ApiService
   */
  hideLoader() {
    $('.loader').hide();
  }

  /** Check Platform */
  checkPlatform() {
    if (this.platform.is('android') === true && this.platform.is('mobileweb') === false) {
      return 'android';
    } else if (this.platform.is('ios') === true && this.platform.is('mobileweb') === false) {
      return 'ios';
    } else {
      return 'browser';
    }
  }

  /**
   *
   * @param {string} val_method get/post
   * @param {*} val_url Base URL
   * @param {*} val_data Post Data
   * @returns
   * @memberof ApiService
   */
  // tslint:disable-next-line: variable-name
  hitAPICall(val_method: string, val_url: any, val_data: any) {
    if (val_method === 'get') {
      return this.http.get(val_url);
    } else if (val_method === 'post') {
      return this.http.post(val_url, val_data);
    } else if (val_method === 'delete') {
      return this.http.delete(val_url);
    }
  }

  // tslint:disable-next-line: variable-name
  callTwoAPI(val_method: any, val_url: any, val_data: any): Observable<any> {
    if (val_method === 'get') {
      const response1 = this.http.get(val_url[0]);
      const response2 = this.http.get(val_url[1]);
      return forkJoin([response1, response2]);
    } else if (val_method === 'post') {
      const response1 = this.http.post(val_url[0], val_data[0]);
      const response2 = this.http.post(val_url[1], val_data[1]);
      return forkJoin([response1, response2]);
    }
  }

  showHideMenu(menu: any) {
    return new Promise<any>((resolve, reject) => {
      switch (menu) {
        case 'Home':
          localStorage.homePage = 'true';
          localStorage.newOrderPage = 'true';
          localStorage.uploadOrderPage = 'true';
          localStorage.viewHeaderPage = 'false';
          localStorage.viewDetailsPage = 'false';
          localStorage.sendByEmailPage = 'false';
          localStorage.printPage = 'false';
          localStorage.productSearchPage = 'false';
          localStorage.finishOrderPage = 'false';
          this.event.publish('checkMenu');
          resolve('success');
          break;
        case 'New Order':
          localStorage.homePage = 'true';
          localStorage.newOrderPage = 'false';
          localStorage.uploadOrderPage = 'false';
          localStorage.viewHeaderPage = 'false';
          localStorage.viewDetailsPage = 'false';
          localStorage.sendByEmailPage = 'false';
          localStorage.printPage = 'false';
          localStorage.productSearchPage = 'false';
          localStorage.finishOrderPage = 'false';
          this.event.publish('checkMenu');
          resolve('success');
          break;
        case 'View details':
          localStorage.homePage = 'true';
          localStorage.newOrderPage = 'false';
          localStorage.uploadOrderPage = 'false';
          localStorage.viewHeaderPage = 'true';
          localStorage.viewDetailsPage = 'false';
          localStorage.sendByEmailPage = 'true';
          localStorage.printPage = 'true';
          localStorage.productSearchPage = 'true';
          localStorage.finishOrderPage = 'true';
          this.event.publish('checkMenu');
          resolve('success');
          break;
        case 'View header':
          localStorage.homePage = 'true';
          localStorage.newOrderPage = 'false';
          localStorage.uploadOrderPage = 'false';
          localStorage.viewHeaderPage = 'false';
          localStorage.viewDetailsPage = 'true';
          localStorage.sendByEmailPage = 'true';
          localStorage.printPage = 'true';
          localStorage.productSearchPage = 'false';
          localStorage.finishOrderPage = 'false';
          this.event.publish('checkMenu');
          resolve('success');
          break;
        case 'Send by email':
          localStorage.homePage = 'true';
          localStorage.newOrderPage = 'false';
          localStorage.uploadOrderPage = 'false';
          localStorage.viewHeaderPage = 'true';
          localStorage.viewDetailsPage = 'true';
          localStorage.sendByEmailPage = 'true';
          localStorage.printPage = 'true';
          localStorage.productSearchPage = 'true';
          localStorage.finishOrderPage = 'false';
          this.event.publish('checkMenu');
          resolve('success');
          break;
        case 'Finish order':
          localStorage.homePage = 'true';
          localStorage.newOrderPage = 'false';
          localStorage.uploadOrderPage = 'false';
          localStorage.viewHeaderPage = 'false';
          localStorage.viewDetailsPage = 'true';
          localStorage.sendByEmailPage = 'true';
          localStorage.printPage = 'true';
          localStorage.productSearchPage = 'false';
          localStorage.finishOrderPage = 'false';
          this.event.publish('checkMenu');
          resolve('success');
          break;
        case 'Product search':
          localStorage.homePage = 'true';
          localStorage.newOrderPage = 'false';
          localStorage.uploadOrderPage = 'false';
          localStorage.viewHeaderPage = 'true';
          localStorage.viewDetailsPage = 'true';
          localStorage.sendByEmailPage = 'true';
          localStorage.printPage = 'true';
          localStorage.productSearchPage = 'true';
          localStorage.finishOrderPage = 'false';
          this.event.publish('checkMenu');
          resolve('success');
          break;
        case 'Upload Orders':
          localStorage.homePage = 'true';
          localStorage.newOrderPage = 'true';
          localStorage.uploadOrderPage = 'false';
          localStorage.viewHeaderPage = 'false';
          localStorage.viewDetailsPage = 'false';
          localStorage.sendByEmailPage = 'false';
          localStorage.printPage = 'false';
          localStorage.productSearchPage = 'false';
          localStorage.finishOrderPage = 'false';
          this.event.publish('checkMenu');
          resolve('success');
          break;
        default:
          localStorage.homePage = 'true';
          localStorage.newOrderPage = 'true';
          localStorage.uploadOrderPage = 'true';
          localStorage.viewHeaderPage = 'false';
          localStorage.viewDetailsPage = 'false';
          localStorage.sendByEmailPage = 'false';
          localStorage.printPage = 'false';
          localStorage.productSearchPage = 'false';
          localStorage.finishOrderPage = 'false';
          this.event.publish('checkMenu');
          resolve('success');
          break;
      }
    });
  }

  toBase(n: any, b: any) {
    let sReturn = '';

    // Handle everything from binary to base 36...
    if (b < 2 || b > 36) {
      return null;
    }

    const glyphs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    do {
      sReturn = glyphs.substr(n % b, 1) + sReturn;
      n = Math.floor(n / b);
    }
    while (n > 0);

    return sReturn;
  }

  create_UUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  getAllOrder() {
    if (localStorage.allOrder === undefined || localStorage.allOrder === null) {
      return null;
    } else {
      let getuserDetails = JSON.parse(localStorage.loginUserDetails);
      let currentUserId = 'user_' + getuserDetails.UserID;
      let getAllRecord = JSON.parse(localStorage.allOrder);
      let found = getAllRecord.some(el => el.userID === currentUserId);
      if (found) {
        const index = getAllRecord.findIndex((e) => e.userID == currentUserId);
        if (index !== -1) {
          return getAllRecord[index];
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    }
  }

  setAllOrder(val: any) {
    return new Promise<any>((resolve, reject) => {
      let getuserDetails = JSON.parse(localStorage.loginUserDetails);
      let currentUserId = 'user_' + getuserDetails.UserID;
      let newArr: any = [];
      if (localStorage.allOrder === undefined || localStorage.allOrder === null) {
        newArr = [{
          userID: currentUserId,
          orders: [val]
        }];
        localStorage.allOrder = JSON.stringify(newArr);
        resolve('success');
      } else {
        newArr = JSON.parse(localStorage.allOrder);
        let found = newArr.some(el => el.userID === currentUserId);
        if (found) {
          const index = newArr.findIndex((e) => e.userID == currentUserId);
          let newArray = newArr[index];
          const index_order = newArray.orders.findIndex((e) => e.OrderNo == val.OrderNo);
          if (index_order !== -1) {
            newArray.orders[index_order] = val;
          } else {
            newArray.orders.push(val);
          }
          localStorage.setItem('allOrder', JSON.stringify(newArr));
          resolve('success');
        } else {
          let createNewUSer = {
            userID: currentUserId,
            orders: [val]
          }
          newArr.push(createNewUSer);
          localStorage.setItem('allOrder', JSON.stringify(newArr));
          resolve('success');
        }
      }
    });
  }

  getspecificorderDetail(val: any) {
    return new Promise<any>((resolve, reject) => {
      let getuserDetails = JSON.parse(localStorage.loginUserDetails);
      let currentUserId = 'user_' + getuserDetails.UserID;
      let newArr: any = [];
      newArr = JSON.parse(localStorage.allOrder);
      let found = newArr.some(el => el.userID === currentUserId);
      if (found) {
        const index = newArr.findIndex((e) => e.userID == currentUserId);
        let order_Details = newArr[index];
        let index_order = order_Details.orders.findIndex((e) => e.OrderNo == val);
        resolve(order_Details.orders[index_order]);
      }
    });
  }

  storeCustomers_data(val: any) {
    this.storage.set('customersData', JSON.stringify(val));
  }

  storeProducts_data(val: any) {
    this.storage.set('productsData', JSON.stringify(val));
    this.toast.showToastWithDuration('Data downloaded succssfully', 'top', 5000);
  }

  getCustomers_data() {
    return new Promise<any>((resolve, reject) => {
      this.storage.get('customersData').then((val) => {
        resolve(JSON.parse(val));
      });
    });
  }

  getProducts_data() {
    return new Promise<any>((resolve, reject) => {
      try {
        this.storage.get('productsData').then((val) => {
          resolve(JSON.parse(val));
        });
      } catch (e) {
        console.log('Error in products Data', e);
      }
    });
  }

  filterData(val_text: any, val_arr: any) {
    return val_arr.filter(it => {
      return it.ItemNumber.startsWith(val_text) == true || it.Description.toLowerCase().indexOf(val_text.toLowerCase()) > -1
    });
  }

  removeArray(val_key: string, val_text: any, val_arr: any) {
    const index = val_arr.findIndex(order => order[val_key] === val_text);
    val_arr.splice(index, 1);
    return val_arr;
  }

  removeOrder(val: any) {
    return new Promise<any>((resolve, reject) => {
      let current_user_allOrder = this.getAllOrder();
      let getAllRecord = JSON.parse(localStorage.allOrder);
      let setindex = getAllRecord.findIndex((e) => e.userID == current_user_allOrder.userID);
      if (current_user_allOrder.orders.length == 1) {
        getAllRecord.splice(setindex, 1);
        if (getAllRecord.length == 0) {
          localStorage.removeItem('allOrder');
        } else {
          localStorage.allOrder = JSON.stringify(getAllRecord);
        }
        resolve('success');
      } else {
        const index = current_user_allOrder.orders.findIndex(order => order.OrderNo === val);
        current_user_allOrder.orders.splice(index, 1);
        getAllRecord[setindex] = current_user_allOrder;
        localStorage.allOrder = JSON.stringify(getAllRecord);
        resolve('success');
      }
    });
  }
}
