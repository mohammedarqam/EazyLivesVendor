import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-electronics-view',
  templateUrl: 'electronics-view.html',
})
export class ElectronicsViewPage {

  vendorUid: string = firebase.auth().currentUser.uid;
  vendorRef = firebase.database().ref("Vendors/").child(this.vendorUid);
  name : string;


  electronicsRef= firebase.database().ref("Electronics/").child(this.vendorUid);
  public electronics: Array<any> = [];
  public loadedElectronics : Array<any> = [];
  totElectronics : number =0;

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,
  public navParams: NavParams) {
    this.getElectronics();
  }

  getElectronics(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.electronicsRef.once("value",itemSnapshot=>{
      let tempArray = [];
      itemSnapshot.forEach(itemSnap => {
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        return false;
      });
      this.electronics = tempArray;
      this.loadedElectronics = tempArray;
      this.totElectronics = this.loadedElectronics.length;
    }).then(()=>{
      this.getVendor();
      loading.dismiss();
    }) ;
}

initializeItems(): void {
  this.electronics = this.loadedElectronics;
}
getItems(searchbar) {
  this.initializeItems();
  let q = searchbar;
  if (!q) {
    return;
  }
  this.electronics = this.electronics.filter((v) => {
    if(v.ProductName && q) {
      if (v.ProductName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

  gtNoti(){
    this.navCtrl.setRoot("NotificationsPage");
  }
  gtProfile(){
    this.navCtrl.setRoot("ProfilePage");
  }
  
  getVendor(){  
    this.vendorRef.once('value', snapShot => {
      this.name = snapShot.val().Name;
    });
  }

  addItem(){
    this.navCtrl.setRoot("AddRentalsPage",{cat : "Electronics"} )
  }


}
