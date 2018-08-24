import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FunctionHallListPage } from './function-hall-list';

@NgModule({
  declarations: [
    FunctionHallListPage,
  ],
  imports: [
    IonicPageModule.forChild(FunctionHallListPage),
  ],
})
export class FunctionHallListPageModule {}
