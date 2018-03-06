import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Provider } from '../provider/shared/provider'
import { Product } from '../product/shared/product'
import { Order } from '../order/shared/order'
import { User } from '../shared/user'

@Injectable()
export class BroadcastObjectService {

  provider: Provider = {}
  product: Product = {}  
  order: Order = {}
  user: User = {}
  

  private providerSource = new BehaviorSubject<Provider>(this.provider)
  currentProvider = this.providerSource.asObservable()

  private productSource = new BehaviorSubject<Product>(this.product)
  currentProduct = this.productSource.asObservable()

  private orderSource = new BehaviorSubject<Order>(this.order)
  currentOrder = this.orderSource.asObservable()

  private userSource = new BehaviorSubject<User>(this.user)
  currentUser = this.userSource.asObservable()

  constructor() { }

  broadcastProvider(provider: Provider) {
    this.providerSource.next(provider)
  }

  broadcastProduct(product: Product) {
    this.productSource.next(product)
  }

  broadcastOrder(order: Order) {
    this.orderSource.next(order)
  }

  broadcastUser(user: User) {
    this.userSource.next(user)
  }
}