import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';



@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  //Getting User
  vendorUid: string = firebase.auth().currentUser.uid;

  //References
  vendorRef = firebase.database().ref("Vendors/").child(this.vendorUid);
  notiRef = firebase.database().ref("Notifications/").child(this.vendorUid);

  //Declarations
  name: string;
  public notifications : Array<any> = [];


  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ){
    this.menuCtrl.enable(true);

  }

  ionViewDidEnter() {
   this.getVendor();
   this.getNotifications();
   
  }

  getNotifications() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.notiRef.once('value', itemSnapshot=>{

      this.notifications = [];

      itemSnapshot.forEach(itemSnap => {

        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        if(temp.Status == "Unopened"){
          temp.icon = "eye-off";
          temp.color = "danger";
        }else{
          temp.icon = "eye";
          temp.color="primary"
        }
        this.notifications.push(temp);

        return false;
      });

    });

    loading.dismiss();

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

  sendNotification() {
    this.notiRef.push({
      Event : "Sample Notification",
      Description: "Function Hall Booking",
      Status: "Unopened",
      Date : moment().format("DD / MMM")
    }).then(()=>{
      this.getNotifications();
    }) ;
  }


  showNotification(notify) {

    if(notify.Status=="Unopened"){


    let alert = this.alertCtrl.create({
      title:  notify.Event ,
      subTitle: notify.Description,
       buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Mark as Read',
          handler: data => {
            this.markasRead(notify);
          }
        }
      ]



    });
    alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: notify.Event,
        subTitle: notify.Description,
        buttons: [
          {
            text: 'Done',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Mark as Unread',
            handler: data => {
              this.markasUnRead(notify);
            }
          }
        ]



      });
      alert.present();

    }

  }


markasRead(notify){
  this.notiRef.child(notify.key).set({
    Date : notify.Date,
    Event : notify.Event,
    Description : notify.Description,
    Status  : "Opened"
  }).then(()=>{
    this.getNotifications();
    this.presentToast("Notification Read");
  })
}


markasUnRead(notify){
  this.notiRef.child(notify.key).set({
    Date : notify.Date,
    Event : notify.Event,
    Description : notify.Description,
    Status  : "Unopened"
  }).then(()=>{
    this.getNotifications();
    this.presentToast("Notification Read");
  })
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