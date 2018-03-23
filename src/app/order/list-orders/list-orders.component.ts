import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { OrdersUserService } from '../../order/shared/orders-user.service'

import { User } from '../../shared/user'
import * as _ from 'lodash'

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
  providers: [OrdersUserService]
})
export class ListOrdersComponent implements OnInit {

  orders: any
  user: User

  constructor(private broadcastObjectService: BroadcastObjectService,
    private ordersUserService: OrdersUserService,
    private router: Router) { }

  ngOnInit() {
    this.broadcastObjectService.currentUser.subscribe(user => {
      this.user = user;
      if (!_.isEmpty(this.user)) {
        this.ordersUserService.init(this.user.uid)
        this.ordersUserService.getOrdersHistory().subscribe(orders => {
          this.orders = orders
        })
      }
    })
  }

  openProvider(order) {
    this.router.navigate(['/list-orders-provider', order.id])
  }
}