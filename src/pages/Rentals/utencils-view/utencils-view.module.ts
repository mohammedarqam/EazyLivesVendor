import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UtencilsViewPage } from './utencils-view';

@NgModule({
  declarations: [
    UtencilsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(UtencilsViewPage),
  ],
})
export class UtencilsViewPageModule {}
