import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddingItemsToOrderPage } from './adding-items-to-order.page';
import { ComponentsModule } from '../../components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
const routes: Routes = [
  {
    path: '',
    component: AddingItemsToOrderPage
  }
];

@NgModule({
  imports: [
    SelectDropDownModule,
    NgSelectModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddingItemsToOrderPage]
})
export class AddingItemsToOrderPageModule {}
