import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { OrderHistory } from './history'
import { DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class OrdersUserService {

  orderHistoryCollection: AngularFirestoreCollection<OrderHistory>;
  ordersHistory: Observable<OrderHistory[]>;
  orderHistoryDoc: AngularFirestoreDocument<OrderHistory>;

  userId: string

  constructor(private afs: AngularFirestore) { }


  init(userId: string) {
    this.userId = userId

    this.orderHistoryCollection = this.afs.collection(`history/${userId}/list`, ref => ref.orderBy('date', 'desc'))

    this.ordersHistory = this.orderHistoryCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as OrderHistory;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getOrdersHistory(){
    return this.ordersHistory
  }

  updateOrderHistory(orderHistory: OrderHistory, providerId) {
    this.orderHistoryDoc = this.afs.doc(`history/${this.userId}/list/${providerId}`);
    return this.orderHistoryDoc.set(orderHistory);
  }

}
