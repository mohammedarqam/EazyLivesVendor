import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, MenuController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-view-menu',
  templateUrl: 'view-menu.html',
})
export class ViewMenuPage {

  vendorUid: string = firebase.auth().currentUser.uid;
  vendorRef = firebase.database().ref("Vendors/").child(this.vendorUid);
  name : string;

  items : Array<any> = [];
  packages : Array<any> = [];

  loadedItems : Array<any> = [];
  loadedPackages : Array<any> = [];

  totitems : number;
  totpack : number;
  itemsRef = firebase.database().ref("Items").child(this.vendorUid);

  constructor(
  public navCtrl: NavController, 
  public modalCtrl : ModalController,
  public loadingCtrl: LoadingController,
  public menuCtrl: MenuController,
  public toastCtrl: ToastController,
  public navParams: NavParams) {
    this.getItems();
  }

  getItems(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.itemsRef.once('value',itemSnapshot=>{
      let tempArray = [];
      itemSnapshot.forEach(itemSnap => {
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        return false;
      });
      this.items = tempArray;
      this.loadedItems = tempArray;
      this.totitems = this.loadedItems.length;
    }).then(()=>{
      this.getVendor();
      loading.dismiss();
    });
  }

  


  gtNoti(){
    this.navCtrl.setRoot("NotificationsPage");
  }
  gtProfile(){
    this.navCtrl.setRoot("ProfilePage");
  }
  
  getVendor(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
  
    this.vendorRef.once('value', snapShot => {
      this.name = snapShot.val().Name;
    });
    loading.dismiss();
  }

  
  AddItem() {
    const modal = this.modalCtrl.create("AddItemsPage");
    modal.present();
  }
  AddPackage() {
    const modal = this.modalCtrl.create("AddPackagePage");
    modal.present();
  }



}
