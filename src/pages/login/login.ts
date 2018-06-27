import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Slides } from 'ionic-angular';







@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;

  //References
  vendorRef = firebase.database().ref("Vendors/");
  notiRef = firebase.database().ref("Notifications/");

  //Login Variables
  lemail: string;
  lpass: string;
  //Signup Variables
  sname: string;
  scat: string;
  semail: string;
  spass: string;



  
  
  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter() {
    this.userCheck();
    this.slides.lockSwipes(true);
  }

  userCheck() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

      this.vendorRef.child(firebase.auth().currentUser.uid).on('value', itemSnapshot => {


        if (itemSnapshot.val()) {
          if (itemSnapshot.val().Verified) {
            this.gtHome();
          } else {
            this.signOut();
            this.presentToast("You are not Verified Yet");
            this.lemail = null;
            this.lpass = null;
          }
        } else {
          this.signOut();
          this.presentToast("You are not a Vendor");
          this.lemail = null;
          this.lpass = null;
        }



      });
    }else{
        this.lemail = null;
        this.lpass = null;

    }

    });
    loading.dismiss();

  }



  /*Slides */
  signUpSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 500);
    this.slides.lockSwipes(true);
  }

  loginSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 500);
    this.slides.lockSwipes(true);

  }
/*Slides End */




  login() {
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();

    firebase.auth().signInWithEmailAndPassword(this.lemail, this.lpass).catch(function (error) {
      alert(error.message);
    }).then(() => {
      this.userCheck();
  });
  loading.dismiss();
  }




  signOut() {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
      console.log(error.message);
    });
  }




  signUp() {
    let loading = this.loadingCtrl.create({
      content: 'Signing Up as Vendor ...'
    });
    loading.present();

    firebase.auth().createUserWithEmailAndPassword(this.semail, this.spass).catch(function (error) {
      alert(error.message);
    }).then(() => {
      this.vendorRef.child(firebase.auth().currentUser.uid).set({
        Name: this.sname,
        Category: this.scat,
        Email: this.semail,
        Password: this.spass,

      }).then(() => {
        if (firebase.auth().currentUser) {
          this.gtHome();
        } else {

        }
        
      })
    });
    loading.dismiss();
  }

  gtHome() {
    this.navCtrl.setRoot("HomePage");
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
