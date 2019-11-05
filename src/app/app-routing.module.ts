import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthService]
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'new-order',
    loadChildren: './pages/new-order/new-order.module#NewOrderPageModule'
  },
  {
    path: 'scan',
    loadChildren: './pages/scan/scan.module#ScanPageModule'
  },
  {
    path: 'upload-order',
    loadChildren: './pages/upload-order/upload-order.module#UploadOrderPageModule'
  },
  {
    path: 'adding-items-to-order',
    loadChildren: './pages/adding-items-to-order/adding-items-to-order.module#AddingItemsToOrderPageModule'
  },
  {
    path: 'product-search',
    loadChildren: './pages/product-search/product-search.module#ProductSearchPageModule'
  },
  {
    path: 'send-email',
    loadChildren: './pages/send-email/send-email.module#SendEmailPageModule'
  },
  {
    path: 'finish-order',
    loadChildren: './pages/finish-order/finish-order.module#FinishOrderPageModule'
  },
  {
    path: 'show-items',
    loadChildren: './pages/show-items/show-items.module#ShowItemsPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
