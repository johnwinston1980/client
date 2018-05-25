import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'
import { OrdersProviderService } from '../../order/shared/orders-provider.service'

import { MatDialog, MatDialogRef } from '@angular/material';

import { OrderDialogComponent } from '../../dialogs/order-dialog/order-dialog.component'

@Component({
  selector: 'app-list-orders-provider',
  templateUrl: './list-orders-provider.component.html',
  styleUrls: ['./list-orders-provider.component.css'],
  providers: [OrdersProviderService]
})

export class ListOrdersProviderComponent implements OnInit {

  orders: any
  providerId: string

  constructor(
    private ordersProviderService: OrdersProviderService,
    private broadcastObjectService: BroadcastObjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {

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


  openDialog(order): void {

    let dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '300px',
      height: '600px',
      data: { id: order.id }
    });
    
    /*dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });*/
  }


}