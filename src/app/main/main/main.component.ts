import { Component, OnInit } from '@angular/core';

import { MatTab, MatCard } from '@angular/material'

import { Provider } from '../../provider/shared/provider'
import { ProviderService } from '../../provider/shared/provider.service'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { User } from '../../shared/user'

//import { openApp } from 'nativescript-open-app'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ProviderService]
})
export class MainComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;

  providers: any;

  showFiller = false;

  userAuthState: Observable<firebase.User>;

  user: User 

  constructor(
    private providerService: ProviderService, 
    private broadcastObjectService: BroadcastObjectService,
    private afAuth: AngularFireAuth) {
      this.userAuthState = afAuth.authState
     }


  ngOnInit() {

    this.broadcastObjectService.currentUser.subscribe( user => {
      this.user = user
    })

    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers
    })

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.setCurrentPosition();

  }
  

  /*open(){
    openApp("fb://");
  }*/

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
