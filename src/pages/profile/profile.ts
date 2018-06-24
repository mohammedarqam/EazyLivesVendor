import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  vendorUid: string = firebase.auth().currentUser.uid;
  vendorRef = firebase.database().ref("Vendors/").child(this.vendorUid);
  name: string;
  category : string;
  email : string;
  password : string;
  verified : string;
  public user : Array<any> = [];

  newEmail :string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,

  ) { }

  ionViewDidEnter() {
    this.getVendor();
  }




  getVendor() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    

    this.vendorRef.once('value', snapShot => {
      var temp = snapShot.val();
      this.name = temp.Name;
      this.category = temp.Category;
      this.email = temp.Email;
      this.password = temp.Password;
      this.verified = temp.Verified;
      console.log(this.password);
      console.log(this.verified);
  

    }).then(() => {
      loading.dismiss();
    });
  }

update(){
  let loading = this.loadingCtrl.create({
    content: 'Saving...'
  });
  loading.present();
  
  this.vendorRef.set({
    Name : this.name,
    Category : this.category,
    Password : this.password,
    Email : this.email,
    Verified : this.verified
    
  }).then(()=>{
    this.presentToast("Data Updated");
    this.getVendor();
  })
  loading.dismiss();


}

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }

updateEmailConfirm(){
    let confirm = this.alertCtrl.create({
      title: 'Replace your current Email with ' + this.newEmail,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            this.updateEmail();
          }
        }
      ]
    });
    confirm.present();
  }




updateEmail(){
  firebase.auth().currentUser.updateEmail(this.newEmail).then(()=>{
    this.updateEmailInDatabase();
  }).catch(function(error){
    alert(error.message);
  })
}

updateEmailInDatabase(){
  let loading = this.loadingCtrl.create({
    content: 'Saving...'
  });
  loading.present();

  this.vendorRef.set({
    Name: this.name,
    Category: this.category,
    Password: this.password,
    Email: this.newEmail,
    Verified: this.verified

  }).then(() => {
    this.presentToast("Email Updated");
    this.getVendor();
  })
  loading.dismiss();
  
}

}