import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { Order } from '../../order/shared/order'
import { TSMap } from "typescript-map"
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import * as _ from 'lodash'
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  order: Order = {}

  @Output()
  uploaded = new EventEmitter<string>();

  constructor(private broadcastObjectService: BroadcastObjectService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
      

  }

  toggle() {
    this.uploaded.emit('toggle');
  }

  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe( params => {
      console.log(params)
    })


    this.broadcastObjectService.currentOrder.subscribe(order => {
      this.order = order
    })

    var savedOrder = JSON.parse(localStorage.getItem('order'))
    if (!_.isEmpty(savedOrder)) {
      this.order = savedOrder;
      this.broadcastObjectService.broadcastOrder(this.order)
    }
    else {
      this.order.products = new TSMap<string, any>()
      this.broadcastObjectService.broadcastOrder(this.order)
    }
  }

  home() {
    this.router.navigate(['']);
    this.uploaded.emit('close');
  }
}