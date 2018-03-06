import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { OrderFirestore } from './order_firestore';

@Injectable()
export class OrderService {

  ordersCollection: AngularFirestoreCollection<OrderFirestore>;
  orders: Observable<OrderFirestore[]>;
  orderDoc: AngularFirestoreDocument<OrderFirestore>;

  providerId: string;

  constructor(private afs: AngularFirestore) {
    
  }

  init(providerId: string, userId: string) {
    this.providerId = providerId;
    
    this.ordersCollection = this.afs.collection(
      `orders/${this.providerId}/list`, 
       ref => ref.where('userId', '==', `${userId}`)
    );

    //this.providersCollection = this.afs.collection('providers/', ref => ref.where('userId', '==', `${this.userId}`));

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

  addOrder(order: OrderFirestore) {
    this.ordersCollection.add(order)   
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