import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { FunctionHallListPage } from '../pages/Function Hall/function-hall-list/function-hall-list';
import { HomePage } from '../pages/Primary/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{ title: string, component: any, icon: any }>;
  activePage: any;

  vendorRef = firebase.database().ref("Vendors/");

  constructor(
  public platform: Platform,
  public toastCtrl: ToastController,
) {
    this.initializeApp();
    this.userCheck();
    this.pages = [
      { title: 'Home', component: "HomePage", icon: "home" },
      { title: 'Function Halls', component: "FunctionHallListPage", icon: "ios-pin"  },
      { title: 'Add FunctionHall', component: "AddFunctionHallPage", icon: "ios-pin"  },
      { title: 'Notifications', component: "NotificationsPage", icon: "md-notifications" },
      { title: 'Profile', component: "ProfilePage", icon: "ios-contact" },
    ];
    this.activePage = this.pages[0];

  }

  userCheck() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      this.vendorRef.child(firebase.auth().currentUser.uid).on('value', itemSnapshot => {
        if (itemSnapshot.val()) {
          if (itemSnapshot.val().Verified) {
            this.rootPage = "HomePage";
          } else {
            this.rootPage= "LoginPage";
            this.signOut();
            this.presentToast("You are not Verified Yet");
            
          }
        } else {
          this.rootPage= "LoginPage";
          this.presentToast("You are not a Vendor");
        }
      });
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




  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }

  checkActive(page) {
    return page == this.activePage;
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot("LoginPage");
    }).catch((error) => {
      console.log(error.message);
    });
  }



}
