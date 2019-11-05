import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CallApiService } from '../../services/call-api/call-api.service';
import { ToastModule } from '../../modules/toast/toast.module';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.page.html',
  styleUrls: ['./show-items.page.scss'],
})
export class ShowItemsPage {
  public order_Data: any;
  @ViewChild('barcode', { static: false }) barcode;
  public scanData: any;
  barcodeValue: any = '';
  constructor(public route: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    public service: CallApiService,
    public alert: ToastModule) { }

  ionViewWillEnter() {
    this.barcode.setFocus();
    this.getOrderDetails();
    this.service.showHideMenu('View details');
  }

  enterInput(val: any) {
    if (val.length >= 1 && val.length) {
      this.scanData = '';
      const navigationExtras: NavigationExtras = {
        state: {
          user: val
        }
      };
      this.router.navigate(['adding-items-to-order'], navigationExtras);
      // this.service.showLoader();
      // const allswapProduct = JSON.parse(localStorage.swapmergeInfo);
      // let getspecific = allswapProduct.filter(it => { return it.OldUPCCode == val });
      // this.service.getProducts_data().then((val: any) => {
      //   if (getspecific.length == 1) {
      //     this.service.hideLoader();
      //     const navigationExtras: NavigationExtras = {
      //       state: {
      //         user: val
      //       }
      //     };
      //     this.router.navigate(['adding-items-to-order'], navigationExtras);
      //   } else {
      //     let filterData = val.find(e => e.UPCCode == val);
      //     if (filterData) {
      //       this.service.hideLoader();
      //       const navigationExtras: NavigationExtras = {
      //         state: {
      //           user: val
      //         }
      //       };
      //       this.router.navigate(['adding-items-to-order'], navigationExtras);
      //     } else {
      //       this.service.hideLoader();
      //       this.alert.showAlert('Item not found', 'OK', () => { });
      //       this.service.hideLoader();
      //     }
      //   }
      // });
    }
  }

  getOrderDetails() {
    this.service.getspecificorderDetail(localStorage.current_OrderNumber).then((response: any) => {
      this.order_Data = response;
    });
  }

  addItem(val: any) {
    if (val != '') {
      const navigationExtras: NavigationExtras = {
        state: {
          itemData: val
        }
      };
      this.router.navigate(['adding-items-to-order'], navigationExtras);
    } else {
      this.router.navigate(['adding-items-to-order']);
    }
  }

  scanCodePage() {
    this.navCtrl.navigateForward(['/scan']);
  }
}
