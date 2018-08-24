import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';




@IonicPage()
@Component({
  selector: 'page-add-function-hall',
  templateUrl: 'add-function-hall.html',
})
export class AddFunctionHallPage {

  functionHallRef = firebase.database().ref("FunctionHalls/");

  name : string = '' ;
  Ownership : string = "Owned";
  Owner1 : string = '' ;
  Owner2: string = '' ;
  ContactPerson : string = '' ;
  OfficeContact :string = '' ;
  MobileContact :string = '' ;
  MaintenanceContact :string = '' ;
  MaxCapacity :string = '' ;
  MinCapacity :string = '' ;
  CroceryVariety : boolean = false;
  CroceryVarietyAmount : string = '' ;
  CutleryAvailable : boolean = false;
  CutleryAvailableAmount : string = '' ;
  DecorIncluded : boolean = false;
  DecorIncludedAmount : string = '' ;
  ElectricalDecors : boolean = false;
  ElectricalDecorsAmount : string = '' ;
  ReadyMadeStage : boolean = false;
  ReadyMadeStageAmount : string = '' ;
  MeterConsumptionIncluded : boolean = false;
  MeterConsumptionIncludedAmount : string = '' ;
  ButlerAndBohisIncluded : boolean = false;
  ButlerAndBohisIncludedAmount : string = '' ;
  GeneratorIncluded : boolean = false;
  GeneratorIncludedAmount : string = '' ;
  ACArrangementCharges : boolean = false;
  ACArrangementChargesAmount : string = '';
  ExtraCharges1 : string = '0' ;
  ExtraCharges2 : string = '0' ;
  ExtraCharges3 : string = '0' ;
  MBAmount : string = '0' ;
  NotePoint : string = '' ;
  ExtraPoints : string = '' ;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public loadingCtrl : LoadingController,
  public toastCtrl : ToastController,
) {
}

  save(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.functionHallRef.child(this.name).set({
      Name : this.name,
      Ownership :this.Ownership,
      Owner1 :this.Owner1,
      Owner2 :this.Owner2,
      ContactPerson :this.ContactPerson,
      OfficeContact :this.OfficeContact,
      MobileContact :this.MobileContact,
      MaintenanceContact :this.MaintenanceContact,
      MaxCapacity :this.MaxCapacity,
      MinCapacity :this.MinCapacity,
      CroceryVariety :this.CroceryVariety,
      CroceryVarietyAmount :this.CroceryVarietyAmount,
      CutleryAvailable :this.CutleryAvailable,
      CutleryAvailableAmount :this.CutleryAvailableAmount,
      DecorIncluded :this.DecorIncluded,
      DecorIncludedAmount :this.DecorIncludedAmount,
      ElectricalDecors :this.ElectricalDecors,
      ElectricalDecorsAmount :this.ElectricalDecorsAmount,
      ReadyMadeStage :this.ReadyMadeStage,
      ReadyMadeStageAmount :this.ReadyMadeStageAmount,
      MeterConsumptionIncluded :this.MeterConsumptionIncluded,
      MeterConsumptionIncludedAmount :this.MeterConsumptionIncludedAmount,
      ButlerAndBohisIncluded :this.ButlerAndBohisIncluded,
      ButlerAndBohisIncludedAmount :this.ButlerAndBohisIncludedAmount,
      GeneratorIncluded :this.GeneratorIncluded,
      GeneratorIncludedAmount :this.GeneratorIncludedAmount,
      ACArrangementCharges :this.ACArrangementCharges,
      ACArrangementChargesAmount :this.ACArrangementChargesAmount,
      ExtraCharges1 :this.ExtraCharges1,
      ExtraCharges2 :this.ExtraCharges2,
      ExtraCharges3 :this.ExtraCharges3,
      MBAmount :this.MBAmount,
      NotePoint :this.NotePoint,
      ExtraPoints :this.ExtraPoints,
    }).then(()=>{
      this.navCtrl.setRoot("AfhImagesPage",{name : this.name});
      loading.dismiss();
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


  capsName(name){
    this.name = name.toUpperCase();
  }
  capsOwner1(Owner1){
    this.Owner1 = Owner1.toUpperCase();
  }
  capsOwner2(Owner2){
    this.Owner2 = Owner2.toUpperCase();
  }
  capsContactPerson(ContactPerson){
    this.ContactPerson = ContactPerson.toUpperCase();
  }
}
