import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FurnitureViewPage } from './furniture-view';

@NgModule({
  declarations: [
    FurnitureViewPage,
  ],
  imports: [
    IonicPageModule.forChild(FurnitureViewPage),
  ],
})
export class FurnitureViewPageModule {}
