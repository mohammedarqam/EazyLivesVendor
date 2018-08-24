import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';




@IonicPage()
@Component({
  selector: 'page-function-hall-edit',
  templateUrl: 'function-hall-edit.html',
})
export class FunctionHallEditPage {

fHall :any = this.navParams.get("fHall");

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.fHall);
  }

}
