import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-utencils-view',
  templateUrl: 'utencils-view.html',
})
export class UtencilsViewPage {

  vendorUid: string = firebase.auth().currentUser.uid;
  vendorRef = firebase.database().ref("Vendors/").child(this.vendorUid);
  name : string;

  utencilRef= firebase.database().ref("Utencils/").child(this.vendorUid);
  public utencils: Array<any> = [];
  public loadedUtencils : Array<any> = [];
  totUtencils : number =0;
  constructor(
  public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,
  public navParams: NavParams) {
    this.getUtencils();
  }

  gtNoti(){
    this.navCtrl.setRoot("NotificationsPage");
  }
  gtProfile(){
    this.navCtrl.setRoot("ProfilePage");
  }
  
  getUtencils(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.utencilRef.once("value",itemSnapshot=>{
      let tempArray = [];
      itemSnapshot.forEach(itemSnap => {
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        return false;
      });
      this.utencils = tempArray;
      this.loadedUtencils = tempArray;
      this.totUtencils = this.loadedUtencils.length;
    }).then(()=>{
      this.getVendor();
      loading.dismiss();
    })  ;
}

initializeItems(): void {
  this.utencils = this.loadedUtencils;
}
getItems(searchbar) {
  this.initializeItems();
  let q = searchbar;
  if (!q) {
    return;
  }
  this.utencils = this.utencils.filter((v) => {
    if(v.ProductName && q) {
      if (v.ProductName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}



  getVendor(){
    this.vendorRef.once('value', snapShot => {
      this.name = snapShot.val().Name;
    });
  }

  
  addItem(){
    this.navCtrl.setRoot("AddRentalsPage",{cat : "Utencils"} )
  }

}
