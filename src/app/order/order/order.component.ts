import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'

import { MatDialog, MatDialogRef } from '@angular/material';

import { AngularFireAuth } from 'angularfire2/auth';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { Order } from '../../order/shared/order'
import { OrderFirestore } from '../../order/shared/order_firestore'
import { Product } from '../../product/shared/product'
import { OrdersProviderService } from '../../order/shared/orders-provider.service'

import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component'
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component'

import { User } from '../../shared/user'
import { Provider } from '../../provider/shared/provider'
import * as _ from 'lodash'

import { AmazingTimePickerService } from 'amazing-time-picker'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrdersProviderService]
})

export class OrderComponent implements OnInit, OnDestroy {

  provider: Provider
  user: User
  order: Order
  pickupTime: string
  remarks: string
  timeSelected: boolean
  authState: any = null

  constructor(
    private atp: AmazingTimePickerService,
    private broadcastObjectService: BroadcastObjectService,
    private ordersProviderService: OrdersProviderService,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

    this.timeSelected = false

  }

  ngOnInit() {

    this.broadcastObjectService.currentUser.subscribe(user => {
      this.user = user;
      if (!_.isEmpty(this.user)) {
        this.broadcastObjectService.currentProvider.subscribe(provider => {
          this.provider = provider
          this.ordersProviderService.init(this.provider.id, this.user.uid)
        })
      }
    })

    this.broadcastObjectService.currentOrder.subscribe(order => {
      this.order = order
    })

  }

  ngOnDestroy() {
    
  }

  

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.pickupTime = time
      this.timeSelected = true
      console.log(time);
    });
  }


  placeOrder() {

    if (!this.timeSelected) {
      this.open()
    }

    else {      
      this.ordersProviderService.addOrder(this.remarks, this.pickupTime, this.user, this.provider, this.order).then(value => {

        console.log('after insert')
        console.log(value.id)

        //this.broadcastObjectService.broadcastOrder({})

        let dialogRef = this.dialog.open(MessageDialogComponent, {
          width: '350px',
          data: { showMessage: 'Su orden ha sido creada!' }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate([''])
        })

      }).catch(error => {
        console.log(error)
      })
    }
  }



  openDialog(): void {
    if (this.authenticated) {
      this.placeOrder()
    }
    else {
      let dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '350px',
        data: { name: '', animal: '' }
      });
      /*dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });*/
    }
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

}