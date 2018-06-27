import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import * as firebase from 'firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


firebase.initializeApp({
  apiKey: "AIzaSyDRiZU7VAD2QXJ90hPzA6r4HPss_kY4QDU",
  authDomain: "esupplier-codebro.firebaseapp.com",
  databaseURL: "https://esupplier-codebro.firebaseio.com",
  projectId: "esupplier-codebro",
  storageBucket: "esupplier-codebro.appspot.com",
  messagingSenderId: "457078122816"
});





@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

