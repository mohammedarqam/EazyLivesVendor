import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPackagePage } from './view-package';

@NgModule({
  declarations: [
    ViewPackagePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPackagePage),
  ],
})
export class ViewPackagePageModule {}
