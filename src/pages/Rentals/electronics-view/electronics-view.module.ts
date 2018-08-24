import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElectronicsViewPage } from './electronics-view';

@NgModule({
  declarations: [
    ElectronicsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ElectronicsViewPage),
  ],
})
export class ElectronicsViewPageModule {}
