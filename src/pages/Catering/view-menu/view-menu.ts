import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, MenuController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ViewPackagePage } from '../view-package/view-package';

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
  packRef = firebase.database().ref("Package").child(this.vendorUid);

  constructor(
  public navCtrl: NavController, 
  public modalCtrl : ModalController,
  public loadingCtrl: LoadingController,
  public alertCtrl : AlertController, 
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
      this.getPack();
      loading.dismiss();
    });
  }

  getPack(){
    this.packRef.once('value',itemSnapshot=>{
      let tempArray = [];
      itemSnapshot.forEach(itemSnap => {
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        return false;
      });
      this.packages = tempArray;
      this.loadedPackages = tempArray;
      this.totpack = this.loadedPackages.length;
    });
  }
  

  view(pack){
    const modal = this.modalCtrl.create("ViewPackagePage",{package : pack});
    modal.present();
  }
  


  delPackConfirm(pack) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete this Package ?',
      message: 'This Package cannot be recovered again',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: 'Yes, I understand',
          handler: () => {
            this.delPack(pack);
          }
        }
      ]
    });
    confirm.present();
  }


  delPack(pack) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

      this.packRef.child(pack.key).remove().then(() => {
        this.getPack();
        this.presentToast("Package Deleted");
      }).then(()=>{
        loading.dismiss();
      }) ;
  
 }

  
 delItemConfirm(item) {
  let confirm = this.alertCtrl.create({
    title: 'Are you sure you want to Delete this Item ?',
    message: 'This Item cannot be recovered again',
    buttons: [
      {
        text: 'No, Its a mistake',
        handler: () => {

        }
      },
      {
        text: 'Yes, I understand',
        handler: () => {
          this.delItem(item);
        }
      }
    ]
  });
  confirm.present();
}


delItem(item) {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();

    this.itemsRef.child(item.key).remove().then(() => {
      this.getItems();
      this.presentToast("Item Deleted");
    }).then(()=>{
      loading.dismiss();
    }) ;

}

  
initializeItemsI(): void {
  this.items = this.loadedItems;
}
getItemsI(searchbar) {
  this.initializeItemsI();
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
  
  
initializeItemsP(): void {
  this.packages = this.loadedPackages;
}
getItemsP(searchbar) {
  this.initializeItemsP();
  let q = searchbar;
  if (!q) {
    return;
  }
  this.packages = this.packages.filter((v) => {
    if(v.Name && q) {
      if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}







 presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    showCloseButton: false,
  });
  toast.present();
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
