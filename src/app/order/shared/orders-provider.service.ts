import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { OrderFirestore } from './order_firestore';
import { OrderHistory } from './history'
import { DocumentReference } from '@firebase/firestore-types';

import { OrdersUserService } from './orders-user.service'

import { Product } from '../../product/shared/product'

@Injectable()
export class OrdersProviderService {

  ordersCollection: AngularFirestoreCollection<OrderFirestore>;
  orders: Observable<OrderFirestore[]>;
  orderDoc: AngularFirestoreDocument<OrderFirestore>;


  providerId: string
  userId: string

  constructor(private afs: AngularFirestore, private ordersUserService: OrdersUserService) { }

  init(providerId: string, userId: string) {
    this.providerId = providerId
    this.userId = userId

    this.ordersCollection = this.afs.collection(
      `orders/${this.providerId}/list`, 
       ref => ref.where('userId', '==', `${userId}`).orderBy('createdDate', 'asc')
      );


    this.orders = this.ordersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as OrderFirestore;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getOrders() {
    return this.orders;
  }

  getOrderDetails(id) {
    this.orderDoc = this.afs.doc(`orders/${this.providerId}/list/${id}`);
    return this.orderDoc;
  }

  addOrder(remarks, pickupTime, user, provider, localOrder): Promise<DocumentReference> {

    let order = this.setUpOrder(remarks, pickupTime, user, provider, localOrder)

    return new Promise((resolve, reject) => {
      this.ordersCollection.add(order).then(value => {

        let orderHistory: OrderHistory = {}
        orderHistory.providerName = order.providerName
        orderHistory.date = new Date()

        this.ordersUserService.init(this.userId)
        this.ordersUserService.updateOrderHistory(orderHistory, this.providerId).then(value2 => {
          resolve(value)
        }).catch(error => {
          reject(error)
        })

      }).catch(error => {
        reject(error)
      })
    })

  }

  setUpOrder(remarks, pickupTime, user, provider, localOrder): OrderFirestore {

    let orderFirestore: OrderFirestore = {
      userId: user.uid,
      providerId: provider.id,
      providerName: provider.name,
      pickupTime: pickupTime,
      createdDate: new Date(),
      remarks: remarks,
      products: this.arrayOfProducts(localOrder),
      status: 'pending'
    }

    return orderFirestore

  }


  arrayOfProducts(order): Array<Product> {
    var array = new Array<Product>()
    for (var [key, value] of order.products.entries()) {
      var product = <Product>order.products.get(key.toString())
      array.push(product)
    }
    return array
  }

  deleteOrder(id: string) {
    this.orderDoc = this.afs.doc(`orders/${this.providerId}/list/${id}`);
    this.orderDoc.delete();
  }

  updateOrder(order: OrderFirestore) {
    this.orderDoc = this.afs.doc(`orders/${this.providerId}/list/${order.id}`);
    this.orderDoc.update(order);
  }

}