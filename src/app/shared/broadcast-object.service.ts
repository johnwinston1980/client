import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { Provider } from '../provider/shared/provider'
import { Product } from '../product/shared/product'
import { User } from '../shared/user'

import { Order } from '../shared/order'

@Injectable()
export class BroadcastObjectService {

  provider: Provider = {}
  product: Product = {}
  user: User = {}
  action: string = ""
  total: number = 0


  private actionSource = new BehaviorSubject<string>(this.action)
  currentAction = this.actionSource.asObservable()

  private providerSource = new BehaviorSubject<Provider>(this.provider)
  currentProvider = this.providerSource.asObservable()

  private productSource = new BehaviorSubject<Product>(this.product)
  currentProduct = this.productSource.asObservable()

  private userSource = new BehaviorSubject<User>(this.user)
  currentUser = this.userSource.asObservable()

  private totalSource = new BehaviorSubject<number>(this.total)
  currentTotal = this.totalSource.asObservable()

  constructor() { }

  broadcastProvider(provider: Provider) {
    this.providerSource.next(provider)
  }

  broadcastAction(action: string) {
    this.actionSource.next(action)
  }

  broadcastProduct(product: Product) {
    this.productSource.next(product)
  }

  broadcastUser(user: User) {
    this.userSource.next(user)
  }  

  updateTotal() {
    this.total = 0
    var products = Order.UserOrder.getInstance().getProducts()
    //var array = new Array<Product>()
    for (var [key, value] of products.entries()) {
      var product = <Product>value
      this.total += product.price
    }
    this.totalSource.next(this.total)
  }
}