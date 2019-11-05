import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage {

  constructor(
    public barcodeScanner: BarcodeScanner,
    public router: Router) {
    this.scanCode();
  }
  /**
     * Scan barcode
     *
     * @memberof ScanPage
     */
  scanCode() {
    this.barcodeScanner.scan().then((barcodeData: any) => {
      const navigationExtras: NavigationExtras = {
        state: {
          user: barcodeData.text
        }
      };
      this.router.navigate(['adding-items-to-order'], navigationExtras);
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
