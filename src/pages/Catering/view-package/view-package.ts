import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-view-package',
  templateUrl: 'view-package.html',
})
export class ViewPackagePage {

  package = this.navParams.get("package")

  constructor(
  public navCtrl: NavController, 
  public viewCtrl: ViewController,
  public navParams: NavParams) {
    console.log(this.package);
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
