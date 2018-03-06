import { Component, OnInit } from '@angular/core';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
/*import { Order } from '../../order/shared/order'
import { OrderFirestore } from '../../order/shared/order_firestore'
import { Product } from '../../product/shared/product'*/
import { OrderService } from '../../order/shared/order.service'

import { User } from '../../shared/user'
import { Provider } from '../../provider/shared/provider'
import * as _ from 'lodash'

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
  providers: [ OrderService ]
})
export class ListOrdersComponent implements OnInit {

  orders: any
  user: User
  provider: Provider

  constructor(private broadcastObjectService: BroadcastObjectService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.broadcastObjectService.currentUser.subscribe(user => {
      this.user = user;
      if(!_.isEmpty(this.user)){
        this.broadcastObjectService.currentProvider.subscribe(provider => {
          this.provider = provider
          this.orderService.init(this.provider.id, this.user.uid)
          this.orderService.getOrders().subscribe(orders => {
            this.orders = orders
          })
        })
      }      
    })    
  }
}
