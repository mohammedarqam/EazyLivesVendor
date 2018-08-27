import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-function-details',
  templateUrl: 'function-details.html',
})
export class FunctionDetailsPage {

  functionHall =  this.navParams.get("functionHall"); 
  images : Array<any> = Object.keys(this.functionHall.Images).map(i => this.functionHall.Images[i]);


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
  }

}
