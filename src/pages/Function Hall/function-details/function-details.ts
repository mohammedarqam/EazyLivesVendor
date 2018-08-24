import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-function-details',
  templateUrl: 'function-details.html',
})
export class FunctionDetailsPage {

  functionHall =  this.navParams.get("factionHall"); 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    console.log(this.functionHall);
  }

}
