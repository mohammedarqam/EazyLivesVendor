import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  vendorUid: string = firebase.auth().currentUser.uid;
  vendorRef = firebase.database().ref("Vendors/").child(this.vendorUid);
  name : string;
  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,

  ) {
    this.menuCtrl.enable(true);
  }


ionViewDidEnter(){

this.getVendor();

}


getVendor(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();

  this.vendorRef.once('value', snapShot => {
    this.name = snapShot.val().Name;
  }).then(()=>{
    this.presentToast( "Signed In as "+ this.name);
    loading.dismiss();
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


}