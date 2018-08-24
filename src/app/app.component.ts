import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import { FunctionHallListPage } from '../pages/Function Hall/function-hall-list/function-hall-list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";

  pages: Array<{ title: string, component: any, icon: any }>;
  activePage: any;

  constructor(public platform: Platform, ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: "HomePage", icon: "home" },
      { title: 'Function Halls', component: "FunctionHallListPage", icon: "ios-pin"  },
      { title: 'Add FunctionHall', component: "AddFunctionHallPage", icon: "ios-pin"  },
      { title: 'Notifications', component: "NotificationsPage", icon: "md-notifications" },
      { title: 'Profile', component: "ProfilePage", icon: "ios-contact" },
    ];
    this.activePage = this.pages[0];

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
