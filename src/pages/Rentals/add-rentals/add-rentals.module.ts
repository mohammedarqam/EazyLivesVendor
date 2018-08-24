import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRentalsPage } from './add-rentals';

@NgModule({
  declarations: [
    AddRentalsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRentalsPage),
  ],
})
export class AddRentalsPageModule {}
