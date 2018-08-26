import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';



@IonicPage()
@Component({
  selector: 'page-add-package',
  templateUrl: 'add-package.html',
})
export class AddPackagePage {


  vendorUid: string = firebase.auth().currentUser.uid;
  vendorRef = firebase.database().ref("Vendors/").child(this.vendorUid);
  items : Array<any> = [];
  loadedItems : Array<any> = [];
  totItems : number
  itemsRef = firebase.database().ref("Items").child(this.vendorUid);

  name : string;
  price : number;
  packItems : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public viewCtrl: ViewController,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController,
  public navParams: NavParams) {
    this.getMenuItems();
  }

  addPack(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    firebase.database().ref("Items").child(firebase.auth().currentUser.uid).push({
      Name : this.name,
      Price : this.price,
      Items : this.packItems,
      TimeStamp : moment().format()
    }).then(()=>{
      this.close();
      loading.dismiss();
    })
  }

  getMenuItems(){
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
      this.totItems = this.loadedItems.length;
    }).then(()=>{
      loading.dismiss();
    });
  }

  initializeItems(): void {
    this.items = this.loadedItems;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.items = this.items.filter((v) => {
      if(v.Name && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  

  addItemtoPack(item,ind){
    this.packItems.push(item);
    this.items.splice(ind,1);
  }

  rmItemtoPack(item,ind){
    this.items.push(item);
    this.packItems.slice(ind,1);
  }

  checkData(){
    switch (true) {
      case !this.name:this.presentToast("Name is Empty");
        break;
      case !this.price:this.presentToast("Price is not provided");
        break;
      case !this.packItems.length:this.presentToast("Select atleast 2 Items for Package");
        break;
      case !(!this.name||!this.price||!this.packItems.length) : this.addPack();
        break;
    
      default:this.presentToast("Something is Wrong");
        break;
    }
  }


  close(){
    this.viewCtrl.dismiss();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      showCloseButton: false,
    });
    toast.present();
  }

}
