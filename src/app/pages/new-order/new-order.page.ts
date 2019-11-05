import { Component } from '@angular/core';
import * as moment from 'moment';
import { CallApiService } from '../../services/call-api/call-api.service';
import { environment } from '../../../environments/environment';
import { ToastModule } from '../../modules/toast/toast.module';
import { NavController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import * as $ from 'jquery';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage {
  public update_custData: any;
  public isUpdate: boolean = false;
  public dataModel: any;
  public orderType: any = [];
  public dropdownOptions = [];
  public newOrder = {
    notes: '',
    order_Type: '',
    reqDate: ''
  };
  public currentCustomerdata: any = '';
  public addNewOrderObj: any = {
    OrderID: null,
    OrderNo: null,
    Server: '',
    CustomerCode: null,
    ReqdDate: '',
    OrderTypeCode: '',
    OrderOriginCode: null,
    CustPO: null,
    TakenBy: '',
    PickUp: false,
    GstFlag: false,
    HstFlag: false,
    PstFlag: false,
    CreatedOn: '',
    DetailCount: '',
    Notes: null,
    OnMobile: true,
    SubTotal: 0,
    Details: [],
    CompanyName: '',
    PriceCode: '',
    Total: '',
    EnforceMoQ: ''
  };
  constructor(
    public alertModule: ToastModule,
    public service: CallApiService,
    public navCtrl: NavController,
    public device: Device) {
    // if (localStorage.viewDetailsPage === true || localStorage.viewDetailsPage === "true") {
    //   this.isUpdate = true;
    //   this.service.getspecificorderDetail(localStorage.current_OrderNumber).then((response: any) => {
    //     this.service.showLoader();
    //     setTimeout(() => {
    //       this.dataModel = response.CompanyName;
    //       if (this.dropdownOptions != null) {
    //         const searchCustomers = this.dropdownOptions.find((cust: any) => cust.CustomerCode == response.CustomerCode);
    //         this.update_custData = $.extend(searchCustomers, response);
    //         this.currentCustomerdata = $.extend(searchCustomers, response);
    //         this.newOrder.notes = this.update_custData.Notes;
    //         this.newOrder.order_Type = this.update_custData.OrderTypeCode;
    //         this.newOrder.reqDate = moment(this.update_custData.ReqdDate).format('MM/DD/YYYY');
    //       }
    //       this.service.hideLoader();
    //     }, 5000);
    //   });
    // }
  }
  public loginUserData: any;
  public config = {
    displayKey: "CompanyName", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Search Customers', // text to be displayed when no item is selected defaults to Select,
    limitTo: 15, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search Customers', // label thats displayed in search input,
    searchOnKey: 'CompanyName'
  }
  ionViewWillEnter() {
    const getyearlasttwoDigit = moment().format('YY');
    const getdayofYear = moment().format('DDDD');
    const hms = moment().format('HH:mm:ss');   // your input string
    const a = hms.split(':'); // split it at the colons
    const getSeconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); // minutes are worth 60 seconds. Hours are worth 60 minutes.
    const orderNumber = getyearlasttwoDigit + getdayofYear + getSeconds; // Concat getyearlasttwoDigit + getdayofYear + getSeconds
    this.addNewOrderObj.OrderNo = this.service.toBase(orderNumber, 20);
    this.readData();
    this.loginUserData = JSON.parse(localStorage.loginUserDetails);
  }

  readData() {
    this.service.showLoader();
    this.service.getCustomers_data().then((val: any) => {
      this.dropdownOptions = val;
      this.service.hideLoader();
      if (localStorage.viewDetailsPage === true || localStorage.viewDetailsPage === "true") {
        this.isUpdate = true;
        this.service.getspecificorderDetail(localStorage.current_OrderNumber).then((response: any) => {
          this.service.showLoader();
          this.dataModel = response.CompanyName;
          if (this.dropdownOptions != null) {
            const searchCustomers = this.dropdownOptions.find((cust: any) => cust.CustomerCode == response.CustomerCode);
            this.update_custData = $.extend(searchCustomers, response);
            this.currentCustomerdata = $.extend(searchCustomers, response);
            this.newOrder.notes = this.update_custData.Notes;
            this.newOrder.order_Type = this.update_custData.OrderTypeCode;
            this.newOrder.reqDate = moment(this.update_custData.ReqdDate).format('MM/DD/YYYY');
          }
        });
      }
    });
    this.orderType = JSON.parse(localStorage.orderTypeInfo);
  }

  getOrderTypeFunc(val: any) {
    let data = this.orderType.filter(item => item.OrderTypeCode === val.detail.value);
    this.addNewOrderObj.EnforceMoQ = data[0].EnforceMoq;
  }

  selectionChanged(val: any) {
    this.currentCustomerdata = val.value;
  }

  openDropdown(val: any) {
    console.log(val);
  }

  addNewOrder() {
    if (this.isUpdate == false) {
      if (this.newOrder.reqDate == '') {
        this.alertModule.showAlert('Please select Reqd. Date', 'OK', () => { });
        return false;
      }

      if (this.newOrder.order_Type == '') {
        this.alertModule.showAlert('Please select Order Type', 'OK', () => { });
        return false;
      }

      this.addNewOrderObj.OrderID = this.service.create_UUID();
      this.addNewOrderObj.CreatedOn = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
      this.addNewOrderObj.CustomerCode = this.currentCustomerdata.CustomerCode;
      this.addNewOrderObj.ReqdDate = this.newOrder.reqDate;
      this.addNewOrderObj.OrderTypeCode = this.newOrder.order_Type;
      this.addNewOrderObj.Notes = this.newOrder.notes === "" ? null : this.newOrder.notes;
      this.addNewOrderObj.CompanyName = this.currentCustomerdata.CompanyName;
      this.addNewOrderObj.PriceCode = this.currentCustomerdata.PriceCode;
      this.addNewOrderObj.Server = this.device.model;
      this.addNewOrderObj.TakenBy = this.loginUserData.UserID;
      this.service.setAllOrder(this.addNewOrderObj).then((response: any) => {
        if (response === 'success') {
          localStorage.current_OrderNumber = this.addNewOrderObj.OrderNo;
          this.service.showHideMenu('View details').then((value: any) => {
            if (value === 'success') {
              this.navCtrl.navigateRoot(['show-items']);
            }
          });
        }
      });
    } else {
      this.addNewOrderObj.OrderID = this.update_custData.OrderID;
      this.addNewOrderObj.CreatedOn = this.update_custData.CreatedOn;
      this.addNewOrderObj.CustomerCode = this.currentCustomerdata.CustomerCode;
      this.addNewOrderObj.ReqdDate = this.newOrder.reqDate;
      this.addNewOrderObj.OrderTypeCode = this.newOrder.order_Type;
      this.addNewOrderObj.Notes = this.newOrder.notes === "" ? null : this.newOrder.notes;
      this.addNewOrderObj.CompanyName = this.currentCustomerdata.CompanyName;
      this.addNewOrderObj.PriceCode = this.currentCustomerdata.PriceCode;
      this.addNewOrderObj.Server = this.update_custData.Server;
      this.addNewOrderObj.TakenBy = this.update_custData.TakenBy
      this.addNewOrderObj.OrderNo = this.update_custData.OrderNo;
      this.addNewOrderObj.OrderOriginCode = this.update_custData.OrderOriginCode;
      this.addNewOrderObj.CustPO = this.update_custData.CustPO;
      this.addNewOrderObj.PickUp = this.update_custData.PickUp;
      this.addNewOrderObj.GstFlag = this.update_custData.GstFlag;
      this.addNewOrderObj.HstFlag = this.update_custData.HstFlag;
      this.addNewOrderObj.PstFlag = this.update_custData.PstFlag;
      this.addNewOrderObj.DetailCount = this.update_custData.DetailCount;
      this.addNewOrderObj.SubTotal = this.update_custData.SubTotal;
      this.addNewOrderObj.Details = this.update_custData.Details;
      this.addNewOrderObj.Total = this.update_custData.Total;

      this.service.setAllOrder(this.addNewOrderObj).then((response: any) => {
        if (response === 'success') {
          this.alertModule.showToastWithDuration('Order updated successfully', 'top', 5000);
          this.service.showHideMenu('View details').then((value: any) => {
            if (value === 'success') {
              this.navCtrl.navigateRoot(['show-items']);
            }
          });
        }
      });
    }
  }

  deleteOrder() {
    this.alertModule.showConfirm('There is no way to recover a deleted order. Do you wish to delete this order?', ['CANCEL', 'OK'], (callBackRes) => {
      if (callBackRes == 'Yes') {
        this.service.removeOrder(this.update_custData.OrderNo).then((return_success: any) => {
          if (return_success == 'success') {
            this.alertModule.showToastWithDuration('Order deleted successfully', 'top', 5000);
            this.navCtrl.navigateRoot(['home']);
          }
        });
      }
    });
  }
}