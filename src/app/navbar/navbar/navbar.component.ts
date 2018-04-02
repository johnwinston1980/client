import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { TSMap } from "typescript-map"
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import {Location} from '@angular/common';

import * as _ from 'lodash'
import * as firebase from 'firebase/app';

import { Order } from '../../shared/order'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  visible: boolean
  total: number

  @Output()
  uploaded = new EventEmitter<string>();

  constructor(private broadcastObjectService: BroadcastObjectService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

      this.visible = false

      router.events.subscribe( (event: Event) => {

        if (event instanceof NavigationStart) {
            // Show loading indicator
            //console.log(event.url)
        }

        if (event instanceof NavigationEnd) {
            // Hide loading indicator
            //console.log(event.url)
            if(event.url === '/'){
              this.visible = false
            }
            else{
              this.visible = true
            }
        }

        if (event instanceof NavigationError) {
            // Hide loading indicator
            // Present error to user
            //console.log(event.error);
        }
    });
  }  

  toggle() {
    this.uploaded.emit('toggle');
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params)
    })

    this.activatedRoute.url.subscribe(url => {
      console.log(url);
    });

    this.broadcastObjectService.currentTotal.subscribe(total => {
      this.total = total
    })
    
  }

  goBack() {
    this.location.back();
    //this.uploaded.emit('close');
  }

  home(){
    this.router.navigate([''])
  }

  saveOrder() {
    this.router.navigate(['orders'])
  }
}