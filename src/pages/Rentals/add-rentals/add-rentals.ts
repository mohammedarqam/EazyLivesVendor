import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-rentals',
  templateUrl: 'add-rentals.html',
})
export class AddRentalsPage {

  cat = this.navParams.get("cat");
  name : string;
  size : string="Not Provided";
  rpd : string;
  Delivery : boolean = false;
  DeliveryCharges : number = 0;



  constructor(
  public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public navParams: NavParams) {
  }


  addRental(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    firebase.database().ref(this.cat).child(firebase.auth().currentUser.uid).push({
      ProductName : this.name,
      Size : this.size,
      RatePerDay : this.rpd,
      Delivery : this.Delivery,
      DeliveryCharges : this.DeliveryCharges,
      AddedOn : moment().format()
    }).then(()=>{
      switch (this.cat) {
        case "Electronics": this.navCtrl.setRoot("ElectronicsViewPage");
          break;
        case "Furniture": this.navCtrl.setRoot("FurnitureViewPage");
          break;
        case "Utencils": this.navCtrl.setRoot("UtencilsViewPage");
          break;
      
        default: this.navCtrl.setRoot("HomePage");
          break;
      }
      loading.dismiss();
    })
  }
  
  
  
  
  capsName(name){
    this.name = name.toUpperCase();
  }




}
