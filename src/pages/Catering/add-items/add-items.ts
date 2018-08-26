import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-items',
  templateUrl: 'add-items.html',
})
export class AddItemsPage {

  name : string;
  price : number;

  constructor(
  public navCtrl: NavController, 
  public modalCtrl : ModalController,
  public viewCtrl: ViewController,
  public loadingCtrl: LoadingController,
  public navParams: NavParams) {
  }

  addItem(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    firebase.database().ref("Items").child(firebase.auth().currentUser.uid).push({
      Name : this.name,
      Price : this.price,
      TimeStamp : moment().format()
    }).then(()=>{
      this.close();
      loading.dismiss();
    })
  }

  
  close(){
    this.viewCtrl.dismiss();
  }





}
