import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class PaymentService {

  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid
    });
    
  }


   processPayment(token: any, amount: number) {
     const stripeKey = 'sk_test_wF9Y7dO9lJ8503c99kyKX3rQ'
     const payment = { token, amount, stripeKey }
     console.log(payment)
     return this.db.list(`/payments/${this.userId}`).push(payment)
   }

}