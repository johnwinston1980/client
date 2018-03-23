import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { MatTab, MatCard } from '@angular/material'

import { Router } from '@angular/router'

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


export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild("infoWindow", { read: ElementRef })
  infoWindow: ElementRef;

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
    private router: Router,
    private afAuth: AngularFireAuth) {
    this.userAuthState = afAuth.authState
  }

  ngAfterViewInit(): void {
    // outputs `I am span`
    //this.infoWindow.nativeElement.

    //console.log(this.infoWindow.nativeElement.open());
}


  ngOnInit() {

    this.broadcastObjectService.currentUser.subscribe(user => {
      this.user = user
    })

    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers
    })

    //set google maps defaults
    this.zoom = 8;
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
        this.zoom = 11;
      });
    }
  }

  openProvider(provider) {
    this.broadcastObjectService.broadcastProvider(provider)
    //this.router.navigate(['/list-categories', provider.id])
    //this.router.navigate(['/menu', provider.id])
    this.router.navigate(['/content', provider.id])
  }

}