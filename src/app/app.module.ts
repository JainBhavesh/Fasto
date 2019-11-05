import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';

/** Routing */
import { AppRoutingModule } from './app-routing.module';

/** Services */
import { AuthService } from './services/auth/auth.service';
import { NetworkService } from './services/network/network.service';

/** Components */
import { ComponentsModule } from './components/components.module';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';

/** Plugins */
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { SQLite } from '@ionic-native/sqlite/ngx';
/** Modules */
import { ToastModule } from './modules/toast/toast.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
// import { SqliteDBService } from './services/sqlite-db/sqlite-db.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [CustomHeaderComponent],
  imports: [
    BrowserModule,
    NgSelectModule,
    SelectDropDownModule,
    ToastModule,
    HttpClientModule,
    ComponentsModule,
    NgxPaginationModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    NetworkService,
    // SqliteDBService,
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    Network,
    Device,
    // SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
