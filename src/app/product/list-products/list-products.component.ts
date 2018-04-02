import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { ProductService } from '../shared/product.service'
import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { Product } from '../shared/product'
import { TSMap } from "typescript-map"

import * as _ from 'lodash'

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [ProductService]
})

export class ListProductsComponent implements OnInit {

  products: any;
  images: any;
  providerId: string
  categoryId: string
  
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private broadcastObjectService: BroadcastObjectService) {
    this.providerId = this.route.snapshot.params['provId']
    this.categoryId = this.route.snapshot.params['catId']
    this.productService.init(this.providerId, this.categoryId)
  }

  ngOnInit() {

    this.productService.getProducts().subscribe(products => {
      this.products = products
    })

  }

  showDetails(product: Product) {
    this.broadcastObjectService.broadcastProduct(product)
    this.router.navigate(['/details-product'])
  }

  isSelected(product): boolean {
    /*if (!_.isEmpty(this.order.products.get(product.categoryId))) {
      return !_.isEmpty(this.order.products.get(product.categoryId).get(product.id))
    }*/
    return false
  }

  /*onSelectionChange(product) {
    if (!_.isEmpty(this.order.products.get(product.categoryId))) { 
      this.order.products.delete(product.categoryId)
    }    
    else{
      this.order.products.set(product.categoryId, product)
    }
    this.router.navigate(['/list-categories', product.providerId])
  }  */

  /*onSelectionChange(product) {
    //first case, empty category, add item
    if (_.isEmpty(this.order.categories.get(product.categoryId))) {
      let newProduct = new TSMap<string, Product>()
      newProduct.set(product.id, product)
      this.order.products.set(product.categoryId, newProduct)
      this.order.categories.set(product.categoryId, product.categoryName)
    }
    //second case, category exist, add item
    else if (!_.isEmpty(this.order.categories.get(product.categoryId)) &&
      _.isEmpty(this.order.products.get(product.categoryId).get(product.id))) {
      this.order.products.get(product.categoryId).set(product.id, product)
    }
    //third case, both exist, delete
    else {
      this.order.products.get(product.categoryId).delete(product.id)
      //if category is now empty, delete category
      if(this.order.products.get(product.categoryId).size() == 0){
        this.order.products.delete(product.categoryId)
        this.order.categories.delete(product.categoryId)
      }      
    }
    this.router.navigate(['list-categories', product.providerId])
  }*/

  getImages(productId) {
    //this.pro   
  }
}