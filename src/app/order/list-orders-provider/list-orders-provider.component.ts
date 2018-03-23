import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { OrdersProviderService } from '../../order/shared/orders-provider.service'

@Component({
  selector: 'app-list-orders-provider',
  templateUrl: './list-orders-provider.component.html',
  styleUrls: ['./list-orders-provider.component.css'],
  providers: [ OrdersProviderService ]
})
export class ListOrdersProviderComponent implements OnInit {

  orders: any
  providerId: string

  constructor(
    private ordersProviderService: OrdersProviderService,
    private broadcastObjectService: BroadcastObjectService,
    private route: ActivatedRoute) {

    this.providerId = route.snapshot.params['provId']

  }

  ngOnInit() {
    this.broadcastObjectService.currentUser.subscribe(user => {
      this.ordersProviderService.init(this.providerId, user.uid)
      this.ordersProviderService.getOrders().subscribe(orders => {
        this.orders = orders
      })
    })
  }
}
