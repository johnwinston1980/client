import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { Product } from '../shared/product'
import { ImagesService } from '../../shared/images.service'
import { Order } from '../../order/shared/order'
import { TSMap } from "typescript-map"

import * as _ from 'lodash'

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css'],
  providers: [ImagesService]
})
export class DetailsProductComponent implements OnInit {

  product: Product
  images: any
  order: Order

  constructor(private broadcastObjectService: BroadcastObjectService,    
    private imagesService: ImagesService,
    private router: Router) {
  }

  ngOnInit() {
    this.broadcastObjectService.currentOrder.subscribe(order => {
      this.order = order
      this.broadcastObjectService.currentProduct.subscribe(product => {
        this.product = product
        this.imagesService.init(this.product.id)
        this.imagesService.getImages().subscribe( images => {
          this.images = images
        })
      })
    })
  }

  addToCurrentOrder() {
    this.product.isSelected = true  
    this.order.products.set(this.product.categoryId, this.product)
    //this.router.navigate(['list-categories', this.product.providerId])
  }

  isSelected(): boolean {
    /*if (!_.isEmpty(this.order.categories.get(this.product.categoryId))) {
      return !_.isEmpty(this.order.products.get(this.product.categoryId).get(this.product.id))
    }*/
    return false
  }

}