import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';




@IonicPage()
@Component({
  selector: 'page-afh-images',
  templateUrl: 'afh-images.html',
})
export class AfhImagesPage {

  name :string  = this.navParams.get('name');
  imageRef = firebase.storage().ref("FunctionHalls/" + this.name);
  imageDataRef = firebase.database().ref("FunctionHalls/"+ this.name).child("Images");

  functionhall : any;
  randomNumber : any;

  public Images: Array<any> = [];

  constructor(
  public navCtrl: NavController,
  public loadingCtrl : LoadingController,
  public toastCtrl : ToastController, 
  public alertCtrl : AlertController,
  public navParams: NavParams) {
  }

  ionViewDidEnter(){
    this.loadImages();
  }

loadImages(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  this.imageDataRef.once('value', itemSnapshot => {
    this.Images = [];
    itemSnapshot.forEach(itemSnap => {
      var temp = itemSnap.val();
      temp.key = itemSnap.key;
      this.Images.push(temp);
      return false;
    });
  }).then(() => {
    loading.dismiss();
  });

}

  fileChange(event) {

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.gRandom();
      console.log(this.randomNumber);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.imageRef.child(this.randomNumber).put(file).then(()=>{
      this.imageRef.child(this.randomNumber).getDownloadURL().then((dUrl)=>{
        this.imageDataRef.child(this.randomNumber).set({ImageUrl : dUrl}).then(()=>{
          this.loadImages();
        }).then(()=>{
          loading.dismiss();
        });
      });
    });
  }


  
  gRandom(){
    this.randomNumber = Math.floor((Math.random() * 100000) + 1).toString();
  }

  deleteImage(image) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete this Photo ?',
      message: 'This photo cannot be recovered again',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: 'Yes, I understand',
          handler: () => {
            this.delete(image);
          }
        }
      ]
    });
    confirm.present();
  }

done(){
  this.navCtrl.setRoot("FunctionHallListPage");
}
  delete(image) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.imageRef.child(image.key).delete().then(() => {
      this.imageDataRef.child(image.key).remove().then(() => {
        this.loadImages();
      }).then(()=>{
        loading.dismiss();
      }) ;
  
    });
 }












}
