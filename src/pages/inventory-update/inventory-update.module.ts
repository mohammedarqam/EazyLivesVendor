import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryUpdatePage } from './inventory-update';

@NgModule({
  declarations: [
    InventoryUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryUpdatePage),
  ],
})
export class InventoryUpdatePageModule {}
