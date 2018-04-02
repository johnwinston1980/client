import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';

import { MatTab, MatCard } from '@angular/material'

import { Router } from '@angular/router'

import { Provider } from '../../provider/shared/provider'
import { ProviderService } from '../../provider/shared/provider.service'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { GoogleMapsService } from '../../shared/google-maps.service'

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { User } from '../../shared/user'

import * as _ from 'lodash'

//import { openApp } from 'nativescript-open-app'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ProviderService, GoogleMapsService]
})


export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild("infoWindow", { read: ElementRef })
  infoWindow: ElementRef;

  /*@ViewChild("gm", { read: ElementRef })
  gm: ElementRef;*/

  public latitude: number;
  public longitude: number;
  public zoom: number;

  providers: any;

  showFiller = false;

  userAuthState: Observable<firebase.User>;

  user: User

  locationSet: boolean

  constructor(
    private providerService: ProviderService,
    private broadcastObjectService: BroadcastObjectService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private googleMaps: GoogleMapsService,
    private _zone: NgZone) {

    this.userAuthState = afAuth.authState
    this.locationSet = false

  }

  ngAfterViewInit(): void {
    // outputs `I am span`
    //this.infoWindow.nativeElement.

    //console.log(this.infoWindow.nativeElement.open());
  }


  ngOnInit() {

    if (!_.isEmpty(localStorage.getItem('position'))) {
      this.latitude = parseFloat(localStorage.getItem('lat'))
      this.longitude = parseFloat(localStorage.getItem('lng'))
      this.zoom = 11;
    }

    this.broadcastObjectService.currentUser.subscribe(user => {
      this.user = user
    })

    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers
      this.setCurrentPosition()
    })
  }

  getDistance(providers: Provider[]) {
    console.log('get distance')
    for (let provider of providers) {
      this.googleMaps.getDistance(String(this.latitude), String(this.longitude), String(provider.address.lat), String(provider.address.lng)).subscribe(data => {
        var json = JSON.parse(data.toString())
        console.log(json.rows[0].elements[0].distance.text)
        provider.distance = json.rows[0].elements[0].distance.text
      })
    }
  }

  /*open(){
    openApp("fb://");
  }*/

  //we still need to work here
  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position only now')
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        localStorage.setItem('lat', String(this.latitude))
        localStorage.setItem('lng', String(this.longitude))
        localStorage.setItem('position', 'true')
        this.zoom = 11;
        // this.getDistance(this.providers)
      }, (error) => {
        console.log(error.code + ' ' + error.message)
        if (!_.isEmpty(localStorage.getItem('position'))) {
          this.latitude = parseFloat(localStorage.getItem('lat'))
          this.longitude = parseFloat(localStorage.getItem('lng'))
          this.zoom = 11;
        }
        else {
          this.latitude = 39.8282
          this.longitude = -98.5795
          this.zoom = 8
        }
      });
    }
    else {
      //set google maps defaults
      console.log('position defaults')      
      this.latitude = 39.8282
      this.longitude = -98.5795
      this.zoom = 8
    }
  }

  openProvider(provider) {
    this.broadcastObjectService.broadcastProvider(provider)
    //this.router.navigate(['/list-categories', provider.id])
    //this.router.navigate(['/menu', provider.id])
    this.router.navigate(['/content', provider.id])
  }
}