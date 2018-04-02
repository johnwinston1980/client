import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router'

import { Product } from '../../product/shared/product'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { TSMap } from "typescript-map"

import { MenuService } from '../shared/menu.service'
import { MenuItem } from '../shared/menu-item'

import { Category } from '../../category/shared/category'

import * as _ from 'lodash'

import { Order } from '../../shared/order'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService]
})
export class MenuComponent implements OnInit, OnDestroy {

  //providerId: any
  //@Input() providerId: string;

  menuSubject = new Subject<Array<MenuItem>>();
  currentMenu = this.menuSubject.asObservable()


  menu: Array<MenuItem>
  favoriteSeason: any
  checked: boolean
  disable: boolean

  constructor(
    private broadcastObjectService: BroadcastObjectService,
    private router: Router,
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {

    this.disable = true
    this.menuService.init(this.route.snapshot.params['provId'])

    /*this.order.products = new TSMap<string, any>()
    this.broadcastObjectService.broadcastOrder(this.order)*/
  }


  ngOnInit() {

    this.currentMenu.subscribe(menu => {
      this.menu = menu
      /*this.broadcastObjectService.currentOrder.subscribe(order => {
        this.order = order
        if (this.order.products.keys().length == this.menu.length) {
          this.disable = false
        }
      })*/
    })

    this.menuService.getCategories().then(cat => {
      this.menuSubject.next(cat)
    }).catch(error => {
      console.log(error)
    })

  }

  ngOnDestroy() {

  }

  showDetails(product: Product) {
    this.broadcastObjectService.broadcastProduct(product)
    this.router.navigate(['/details-product'])
  }


  showCheckBox(product) {
    this.checked = Order.UserOrder.getInstance().isSelected(product)
    return true
    //not selected category
    /*if (_.isEmpty(this.order.products.get(product.categoryId))) {
      this.checked = false
      return true
    }
    else if (
      //selected category and this is the product
      !_.isEmpty(this.order.products.get(product.categoryId))
      && this.order.products.get(product.categoryId).id == product.id) {
      this.checked = true
      return true
    }
    this.checked = false
    return false*/
  }

  selected(e, product) {
    if (e.checked) {      
      Order.UserOrder.getInstance().addProduct(product)          
    }
    else{      
      Order.UserOrder.getInstance().removeProduct(product)      
    }
    this.broadcastObjectService.updateTotal()
    /*console.log('aqui')
    if (_.isEmpty(this.order.products.get(product.categoryId))) {
      this.order.products.set(product.categoryId, product)
      if (this.menu.length == this.order.products.keys().length) {
        this.disable = false
      }
    }
    else if (
      //selected category and this is the product
      !_.isEmpty(this.order.products.get(product.categoryId))
      && this.order.products.get(product.categoryId).id == product.id) {
      this.order.products.delete(product.categoryId)
      this.disable = true
    }
    else {
      this.order.products.delete(product.categoryId)
      this.disable = true
    }*/
  }
}