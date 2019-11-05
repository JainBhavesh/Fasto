import { Component } from '@angular/core';
import { CallApiService } from '../../services/call-api/call-api.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss'],
})
export class ProductSearchPage {
  config: any;
  public filterProductData: any = [];
  constructor(public service: CallApiService, public router: Router) {
    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.filterProductData.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  searchProduct(val_text: any) {
    this.service.getProducts_data().then((val_array: any) => {
      let filter_arr = this.service.filterData(val_text, val_array);
      this.filterProductData = filter_arr;
    });
  }

  addItem(val: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        itemData: val,
        isProductSearch: true
      }
    };
    this.router.navigate(['adding-items-to-order'], navigationExtras);
  }
}
