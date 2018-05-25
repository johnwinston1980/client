import { Component, OnInit, Input, Inject, OnDestroy, HostListener } from '@angular/core'

import { PaymentService } from '../../payment/shared/payment.service'

import { environment } from '../../../environments/environment'

import { Router } from '@angular/router'
import { MatDialog, MatDialogRef } from '@angular/material'
import { AngularFireAuth } from 'angularfire2/auth'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { OrderFirestore } from '../../order/shared/order_firestore'
import { Product } from '../../product/shared/product'
import { OrdersProviderService } from '../../order/shared/orders-provider.service'

import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component'
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component'

import { User } from '../../shared/user'
import { Provider } from '../../provider/shared/provider'
import * as _ from 'lodash'

import { AmazingTimePickerService } from 'amazing-time-picker'
import { TSMap } from "typescript-map"

import { Order } from '../../shared/order'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrdersProviderService, PaymentService]
})

export class OrderComponent implements OnInit, OnDestroy {

  products: TSMap<string, Product>
  provider: Provider
  user: User
  pickupTime: string
  remarks: string
  timeSelected: boolean
  authState: any = null

  handler: any;
  amount = 500;

  constructor(
    private atp: AmazingTimePickerService,
    private broadcastObjectService: BroadcastObjectService,
    private ordersProviderService: OrdersProviderService,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private router: Router,
    private paymentSvc: PaymentService) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

    this.timeSelected = false
    this.remarks = ''
  }

  ngOnInit() {

    this.products = Order.UserOrder.getInstance().getProducts()

    this.broadcastObjectService.currentUser.subscribe(user => {
      this.user = user;
      if (!_.isEmpty(this.user)) {
        this.broadcastObjectService.currentProvider.subscribe(provider => {
          this.provider = provider
          this.ordersProviderService.init(this.provider.id, this.user.uid)
        })
      }
    })

    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: this.provider.image,
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.amount).then(res => {
          this.createOrder(true)
        })
      },
      opened: function () {
        console.log("Form opened");
      },
      closed: function () {
        console.log("Form closed");
      }
    });

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

  handlePayment() {
    this.handler.open({
      name: this.provider.name,
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }


  placeOrder() {
    
  }

  payAtPickUp() {
    if (!this.timeSelected) {
      this.open()
    }
    else {
      this.createOrder(false)
    }    
  }

  reserveAndPay() {
    if (!this.timeSelected) {
      this.open()
    }
    else {
      this.handlePayment()
    } 
  }

  createOrder(paid) {
    this.ordersProviderService.addOrder(this.remarks, this.pickupTime, this.user, this.provider, paid).then(value => {     

      //clear all
      Order.UserOrder.getInstance().setProviderId(null)
      Order.UserOrder.getInstance().emptyProductList()
      this.broadcastObjectService.updateTotal()

      let dialogRef = this.dialog.open(MessageDialogComponent, {
        width: '350px',
        data: { showMessage: paid == true ? 'Creada y paga' : 'Pagar al recoger'}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate([''])
      })

    }).catch(error => {
      console.log(error)
    })
  }



  openDialog1(): void {
    if (this.authenticated) {
      this.reserveAndPay()
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

  openDialog2(): void {
    if (this.authenticated) {
      this.payAtPickUp()
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