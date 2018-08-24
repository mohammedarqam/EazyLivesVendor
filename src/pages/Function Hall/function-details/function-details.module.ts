import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FunctionDetailsPage } from './function-details';

@NgModule({
  declarations: [
    FunctionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FunctionDetailsPage),
  ],
})
export class FunctionDetailsPageModule {}
