import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-furniture-view',
  templateUrl: 'furniture-view.html',
})
export class FurnitureViewPage {

  vendorUid: string = firebase.auth().currentUser.uid;
  vendorRef = firebase.database().ref("Vendors/").child(this.vendorUid);
  name : string;


  furnitureRef= firebase.database().ref("Furniture/").child(this.vendorUid);
  public furniture: Array<any> = [];
  public loadedFurniture : Array<any> = [];
  totFurniture : number =0;

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,
  public navParams: NavParams) {
    this.getFurniture();
  }
  ionViewDidEnter(){
    this.getFurniture();
  }

  getFurniture(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.furnitureRef.once("value",itemSnapshot=>{
      let tempArray = [];
      itemSnapshot.forEach(itemSnap => {
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        return false;
      });
      this.furniture = tempArray;
      this.loadedFurniture = tempArray;
      this.totFurniture = this.loadedFurniture.length;
    }).then(()=>{
      this.getVendor();
      loading.dismiss();
    }) ;
}

initializeItems(): void {
  this.furniture = this.loadedFurniture;
}
getItems(searchbar) {
  this.initializeItems();
  let q = searchbar;
  if (!q) {
    return;
  }
  this.furniture = this.furniture.filter((v) => {
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
    this.navCtrl.setRoot("AddRentalsPage",{cat : "Furniture"} )
  }

}
