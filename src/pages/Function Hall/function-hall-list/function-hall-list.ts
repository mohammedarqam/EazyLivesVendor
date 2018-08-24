import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController  } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-function-hall-list',
  templateUrl: 'function-hall-list.html',
})
export class FunctionHallListPage {

  vendorUid: string = firebase.auth().currentUser.uid;
  functionRef = firebase.database().ref("FunctionHalls/");
  vendorRef = firebase.database().ref("Vendors/").child(this.vendorUid);
  public functions: Array<any> = [];
  public loadedFunctions : Array<any> = [];
  totFunctions: number = 0;
  name: string;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public alertCtrl : AlertController, 
  public toastCtrl : ToastController,
  public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.getFunctions();
  }
  gtNoti(){
    this.navCtrl.setRoot("NotificationsPage");
  }
  gtProfile(){
    this.navCtrl.setRoot("ProfilePage");
  }
  getVendor() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.vendorRef.once('value', snapShot => {
      this.name = snapShot.val().Name;
    }).then(() => {
      loading.dismiss();
    });
  }
  
  getFunctions(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.getVendor();
    this.functionRef.once('value', itemSnapshot => {
      let tempArray = [];
      itemSnapshot.forEach(itemSnap => {
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        return false;
      });
      this.functions = tempArray;
      this.loadedFunctions = tempArray;
      this.totFunctions = this.functions.length;
    }).then(()=>{
      loading.dismiss();
    })  ;
}

initializeItems(): void {
  this.functions = this.loadedFunctions;
}
getItems(searchbar) {
  this.initializeItems();
  let q = searchbar;
  if (!q) {
    return;
  }
  this.functions = this.functions.filter((v) => {
    if(v.key && q) {
      if (v.key.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

edit(functionHall){
  this.navCtrl.push("FunctionHallEditPage",{fHall : functionHall});
}

view(functionHall){
  this.navCtrl.push("FunctionDetailsPage",{functionHall});
}


  deleteFunction(functionHall) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete this Function Hall ?',
      message: 'This Function Hall cannot be recovered again',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: 'Yes, I understand',
          handler: () => {
            this.delete(functionHall);
          }
        }
      ]
    });
    confirm.present();
  }


  delete(functionHall) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

      this.functionRef.child(functionHall.key).remove().then(() => {
        this.getFunctions();
        this.presentToast();
      }).then(()=>{
        loading.dismiss();
      }) ;
  
 }


 presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Banner Deleted',
    duration: 4000,
  });
  toast.present();
}


newFunction(){
  this.navCtrl.push("AddFunctionHallPage");
}



}



