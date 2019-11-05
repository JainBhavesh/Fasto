import { CallApiService } from './../../services/call-api/call-api.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { NetworkService, ConnectionStatus } from '../../services/network/network.service';
import { ToastModule } from '../../modules/toast/toast.module';

@Component({
  selector: 'app-adding-items-to-order',
  templateUrl: './adding-items-to-order.page.html',
  styleUrls: ['./adding-items-to-order.page.scss'],
})
export class AddingItemsToOrderPage {
  public dataModel: any;
  public dropdownOptions = [];
  public newItem: any = {
    price: '',
    quantity: '',
    total: ''
  };
  quantity = '';
  public order_Data: any;
  public currentItemdata: any = '';
  public companyInfo: any;
  public isAdd: boolean = true;

  @ViewChild('quantity_input', { static: false }) barcode;
  public config = {
    displayKey: "ItemNumber", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '250px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Search Product', // text to be displayed when no item is selected defaults to Select,
    limitTo: 15, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search Product', // label thats displayed in search input,
    searchOnKey: 'ItemNumber'
  }
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    public service: CallApiService,
    public networkService: NetworkService,
    public alertModule: ToastModule,
    public alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.user) {
          this.service.showLoader();
          const scanNumber = this.router.getCurrentNavigation().extras.state.user;
          const allswapProduct = JSON.parse(localStorage.swapmergeInfo);
          let getspecific = allswapProduct.filter(it => { return it.OldUPCCode == scanNumber });
          this.service.getProducts_data().then((val: any) => {
            this.isAdd = true;
            setTimeout(() => {
              if (getspecific.length == 1) {
                this.currentItemdata = val.find(e => e.ItemNumber == getspecific[0].NewItemNumber);
                const checkSwapMerge = getspecific[0].SwapMerge == 'M' ? ' merged with ' : ' swapped with ';
                const msg = 'Item ' + getspecific[0].OldUPCCode + ' has been ' + checkSwapMerge + this.currentItemdata.ItemNumber;
                this.alertModule.showToastWithDuration(msg, 'top', 5000);
              } else {
                this.currentItemdata = val.find(e => e.UPCCode == scanNumber);
              }
              this.service.hideLoader();
              this.selectionChanged(this.currentItemdata, 'productSearch');
            }, 5000);
          });
        } else if (this.router.getCurrentNavigation().extras.state.itemData) {
          const item_Data = this.router.getCurrentNavigation().extras.state.itemData;
          if (this.router.getCurrentNavigation().extras.state.isProductSearch === true) {
            this.getOrderDetails();
            this.service.showLoader();
            setTimeout(() => {
              this.selectionChanged(item_Data, 'productSearch');
              this.service.hideLoader();
            }, 3000);
          } else {
            this.service.getProducts_data().then((val: any) => {
              this.dataModel = val.find(e => e.ItemNumber == item_Data.ItemNumber);
              this.currentItemdata = this.dataModel;
              this.isAdd = false;
              this.selectionChanged(item_Data, '');
            });
          }
        }
      }
    });
  }

  ionViewWillEnter() {
    this.readData();
    this.getOrderDetails();
    this.companyInfo = JSON.parse(localStorage.companyInfo);
  }

  readData() {
    this.service.getProducts_data().then((val: any) => {
      this.dropdownOptions = val;
    });
  }

  getOrderDetails() {
    this.service.getspecificorderDetail(localStorage.current_OrderNumber).then((response: any) => {
      this.order_Data = response;
    });
  }

  searchResult(val: any) {
    this.service.getProducts_data().then((return_val: any) => {
      this.dropdownOptions = return_val.filter(it => { return it.ItemNumber.startsWith(val.term) == true });
    });
  }

  backToItemDispPage() {
    this.navCtrl.navigateRoot(['show-items']);
  }

  selectionChanged(val: any, val1: string) {
    if (val1 == 'selection') {
      this.barcode.setFocus();
      this.currentItemdata = val.value;
      this.newItem.price = this.order_Data.PriceCode == "1" ? this.currentItemdata.PriceCode1 : this.order_Data.PriceCode == "2" ? this.currentItemdata.PriceCode2 : this.order_Data.PriceCode == "3" ? this.currentItemdata.PriceCode3 : this.order_Data.PriceCode == "4" ? this.currentItemdata.PriceCode4 : this.order_Data.PriceCode == "5" ? this.currentItemdata.PriceCode5 : this.order_Data.PriceCode == "6" ? this.currentItemdata.PriceCode6 : this.order_Data.PriceCode == "7" ? this.currentItemdata.PriceCode7 : this.order_Data.PriceCode == "8" ? this.currentItemdata.PriceCode8 : this.order_Data.PriceCode == "9" ? this.currentItemdata.PriceCode9 : this.order_Data.PriceCode == "10" ? this.currentItemdata.PriceCode10 : this.order_Data.PriceCode == "11" ? this.currentItemdata.PriceCode11 : this.order_Data.PriceCode == "12" ? this.currentItemdata.PriceCode12 : this.order_Data.PriceCode == "13" ? this.currentItemdata.PriceCode13 : this.order_Data.PriceCode == "14" ? this.currentItemdata.PriceCode14 : this.order_Data.PriceCode == "S" ? this.currentItemdata.PriceCodeS : this.order_Data.PriceCode == "W" ? this.currentItemdata.PriceCodeW : this.currentItemdata.DefaultPrice;
      this.newItem.quantity = this.order_Data.OrderTypeCode == "O" ? this.currentItemdata.MinOrderQty : this.order_Data.OrderTypeCode == "S" ? this.currentItemdata.MinOrderQty : '';

    } else if (val1 == 'productSearch') {
      this.barcode.setFocus();
      this.dataModel = val;
      this.currentItemdata = val;
      this.newItem.price = this.order_Data.PriceCode == "1" ? this.currentItemdata.PriceCode1 : this.order_Data.PriceCode == "2" ? this.currentItemdata.PriceCode2 : this.order_Data.PriceCode == "3" ? this.currentItemdata.PriceCode3 : this.order_Data.PriceCode == "4" ? this.currentItemdata.PriceCode4 : this.order_Data.PriceCode == "5" ? this.currentItemdata.PriceCode5 : this.order_Data.PriceCode == "6" ? this.currentItemdata.PriceCode6 : this.order_Data.PriceCode == "7" ? this.currentItemdata.PriceCode7 : this.order_Data.PriceCode == "8" ? this.currentItemdata.PriceCode8 : this.order_Data.PriceCode == "9" ? this.currentItemdata.PriceCode9 : this.order_Data.PriceCode == "10" ? this.currentItemdata.PriceCode10 : this.order_Data.PriceCode == "11" ? this.currentItemdata.PriceCode11 : this.order_Data.PriceCode == "12" ? this.currentItemdata.PriceCode12 : this.order_Data.PriceCode == "13" ? this.currentItemdata.PriceCode13 : this.order_Data.PriceCode == "14" ? this.currentItemdata.PriceCode14 : this.order_Data.PriceCode == "S" ? this.currentItemdata.PriceCodeS : this.order_Data.PriceCode == "W" ? this.currentItemdata.PriceCodeW : this.currentItemdata.DefaultPrice;
      this.newItem.quantity = this.order_Data.OrderTypeCode == "O" ? this.currentItemdata.MinOrderQty : this.order_Data.OrderTypeCode == "S" ? this.currentItemdata.MinOrderQty : '';

    } else {
      this.barcode.setFocus();
      this.newItem.quantity = val.Quantity;
      this.newItem.total = val.Extension;
      this.newItem.price = val.NetPrice
    }

    this.newItem.price = parseFloat(this.newItem.price).toFixed(2);
    // this.quantity = this.newItem.quantity;
  }

  calculate_Total(val: any) {
    this.newItem.price = parseFloat(val.target.value).toFixed(2);
  }

  calculate_Quantity(val: any) {
    this.newItem.quantity = val.target.value;
  }

  async checkQuantity(val) {
    // this.newItem.quantity = val;
    if (val.key == '.') {
      this.alertModule.showAlert('Quantity must be a whole number', 'Ok', () => { });

    }
  }

  addOrderItems() {
    if (this.order_Data.EnforceMoQ === true) {
      if (this.newItem.quantity < this.currentItemdata.MinOrderQty) {
        this.alertModule.showAlert('You must need to enter more then equal to' + this.currentItemdata.MinOrderQty + '</b>', 'OK', () => { });
        return false;
      }

      if ((this.newItem.quantity).toString().indexOf('.') > -1) {
        this.alertModule.showAlert('Quantity must be a whole number', 'OK', () => {
          this.newItem.quantity = 1;
          this.quantity = '1';
        });
        return false;
      }
    }
    let createDetailsObj = {
      ItemDescription: this.currentItemdata.Description,
      OrderID: this.order_Data.OrderID,
      ItemNumber: this.currentItemdata.ItemNumber,
      Counter: '',
      NetPrice: this.newItem.price,
      PriceOverride: false,
      Quantity: this.newItem.quantity,
      Extension: this.newItem.total
    };
    const indx = this.order_Data.Details.findIndex(e => e.ItemNumber == this.currentItemdata.ItemNumber);
    if (indx > -1) {
      createDetailsObj.Counter = this.order_Data.Details[indx].Counter;
      this.order_Data.SubTotal = this.order_Data.SubTotal - (parseFloat(this.order_Data.Details[indx].Extension));
      this.order_Data.Total = this.order_Data.Total - (parseFloat(this.order_Data.Details[indx].Extension));
    } else {
      createDetailsObj.Counter = this.order_Data.Details.length === 0 ? 1 : this.order_Data.Details.length + 1
      this.order_Data.DetailCount = this.order_Data.Details.length == 0 ? 1 : this.order_Data.Details.length + 1;
    }

    this.order_Data.SubTotal = this.order_Data.SubTotal === 0 ? parseFloat(this.newItem.total) : (parseFloat(this.newItem.total) + parseFloat(this.order_Data.SubTotal));

    let GstFlag_Count: any = 0;
    let HstFlag_Count: any = 0;
    let PstRate_Count: any = 0;
    if (this.order_Data.GstFlag == true) {
      GstFlag_Count = this.order_Data.SubTotal * this.companyInfo[0].GstRate;
    }

    if (this.order_Data.HstFlag == true) {
      HstFlag_Count = this.order_Data.SubTotal * this.companyInfo[0].HstRate;
    }

    if (this.order_Data.PstFlag == true) {
      PstRate_Count = this.order_Data.SubTotal * this.companyInfo[0].PstRate;
    }
    this.order_Data.SubTotal.toFixed(2);
    this.order_Data.Total = this.order_Data.SubTotal + GstFlag_Count + HstFlag_Count + PstRate_Count;
    this.order_Data.Total.toFixed(2);

    if (this.isAdd == true) {
      this.order_Data.Details.push(createDetailsObj);
    } else {
      this.order_Data.Details[indx] = createDetailsObj;
    }
    this.service.setAllOrder(this.order_Data).then((response: any) => {
      if (response === 'success') {
        this.navCtrl.navigateRoot(['show-items']);
      }
    });
  }

  deleteItems() {
    this.alertModule.showConfirm('There is no way to recover a deleted item. Do you wish to delete this item?', ['CANCEL', 'OK'], (callBackRes) => {
      if (callBackRes == 'Yes') {
        const indx = this.order_Data.Details.findIndex(e => e.ItemNumber == this.currentItemdata.ItemNumber);
        this.order_Data.SubTotal = this.order_Data.SubTotal - parseFloat(this.order_Data.Details[indx].Extension);
        this.order_Data.Total = this.order_Data.Total - parseFloat(this.order_Data.Details[indx].Extension);
        this.order_Data.SubTotal.toFixed(2);
        this.order_Data.Total.toFixed(2);
        this.order_Data.Details.splice(indx, 1);
        this.order_Data.DetailCount--;
        this.service.setAllOrder(this.order_Data).then((response: any) => {
          if (response === 'success') {
            this.alertModule.showToastWithDuration('Item deleted successfully', 'top', 5000);
            this.navCtrl.navigateRoot(['show-items']);
          }
        });
      }
    });
  }
}
