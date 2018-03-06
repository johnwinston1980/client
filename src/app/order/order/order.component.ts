import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';

import {MatDialog, MatDialogRef} from '@angular/material';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { Order } from '../../order/shared/order'
import { OrderFirestore } from '../../order/shared/order_firestore'
import { Product } from '../../product/shared/product'
import { OrderService } from '../../order/shared/order.service'

import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component'

import { User } from '../../shared/user'
import { Provider } from '../../provider/shared/provider'
import * as _ from 'lodash'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService]
})

export class OrderComponent implements OnInit, OnDestroy {

  provider: Provider
  user: User
  order: Order
  arrayOfKeys: any
  orderFirestore: OrderFirestore = {}

  
  animal: string;
  name: string;

  constructor(
    private broadcastObjectService: BroadcastObjectService,
    private orderService: OrderService,
    public dialog: MatDialog) {
  }

  ngOnInit() {    
    this.broadcastObjectService.currentUser.subscribe(user => {
      this.user = user;
      if(!_.isEmpty(this.user)){
        this.broadcastObjectService.currentProvider.subscribe(provider => {
          this.provider = provider
          this.orderService.init(this.provider.id, this.user.uid)
          
          //save order


        })
      }      
    })  

    this.broadcastObjectService.currentOrder.subscribe(order => {
      this.order = order     
    })
  }

  ngOnDestroy(){
    
  }

  placeOrder() {
    this.orderFirestore.userId = this.user.uid
    this.orderFirestore.providerId = this.provider.id
    this.orderFirestore.products = this.arrayOfProducts()
    this.orderFirestore.status = 'pending'
    this.orderService.addOrder(this.orderFirestore);
  }

  arrayOfProducts(): Array<Product> {
    var array = new Array<Product>()
    for (var [key, value] of this.order.products.entries()) {
      //console.log(key + ' = ' + value);
      //for (var [key2, value2] of this.order.products.get(key.toString()).entries()) {
        //var product = <Product>value
        var product = <Product>this.order.products.get(key.toString())
        array.push(product)
        //console.log(key2 + ' = ' +  JSON.stringify(product));
      //}
    }
    return array
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
