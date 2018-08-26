import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage" ;


  alwaysTrue : boolean = true;
  functionHall : boolean = true;//this.superFine("Function Hall",1);
  catering : boolean= true;
  electronics : boolean= true;
  furniture: boolean= true;
  utencils: boolean= true;

  // public categories: Array<any> = [];


  pages: Array<{ title: string, component: any, icon: any,dis: any }>;
  activePage: any;

  // vendorRef = firebase.database().ref("Vendors/");

  constructor(
  public platform: Platform,
  public toastCtrl: ToastController,
) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: "HomePage", icon: "home", dis : this.alwaysTrue },
      { title: 'Function Halls', component: "FunctionHallListPage", icon: "ios-pin",dis : this.functionHall  },
      { title: 'Catering', component: "ViewMenuPage", icon: "ios-pin",dis : this.catering  },
      { title: 'Electronics', component: "ElectronicsViewPage", icon: "ios-pin",dis : this.electronics  },
      { title: 'Furniture', component: "FurnitureViewPage", icon: "ios-pin",dis : this.furniture  },
      { title: 'Utensils', component: "UtencilsViewPage", icon: "ios-pin",dis : this.utencils  },
      { title: 'Inventory Update', component: "InventoryUpdatePage", icon: "ios-pin",dis : this.alwaysTrue  },
      
    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.getCats();
      });
  }

  // getCats(){
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //     this.vendorRef.child(firebase.auth().currentUser.uid).child("Category").once('value', itemSnapshot => {
  //       this.atCat(itemSnapshot.val());
  //       return false;
  //     });
  //   }
  //   });  

  // }

  // atCat(tt){
  //   this.categories = tt;
  //   console.log(this.categories);
  // }

  // superFine(cati,p){
  //   // if(this.categories.findIndex(cati)>-1){

  //   // }
  //   console.log(this.pages);
  //   return false;
  // }


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
