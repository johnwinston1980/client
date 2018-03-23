import { Injectable, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../../category/shared/category.service'
import { ProductService } from '../../product/shared/product.service'

import { Category } from '../../category/shared/category'
import { Product } from '../../product/shared/product'
import { MenuItem } from './menu-item'

//import { TSMap } from 'typescript-map'
import * as _ from 'lodash'


@Injectable()
export class MenuService {

  providerId: any
  menu: Array<MenuItem>

  constructor(
    private catService: CategoryService,
    private prodService: ProductService) { }

  init(providerId) {
    this.providerId = providerId
    this.menu = new Array<MenuItem>()    
  }


  getCategories(): Promise<Array<MenuItem>> {
    return new Promise((resolve, reject) => {
      this.catService.init(this.providerId)
      this.catService.getCategories().subscribe(categories => {        
        if (!_.isEmpty(categories)) {
          resolve(this.getProducts(categories))
        }
        else {
          reject('empty')
        }
      })
    })
  }

  getProducts(categories): Array<MenuItem> {
    let filesIndex = _.range(categories.length)
    _.each(filesIndex, (idx) => {
      let menuItem = new MenuItem()
      menuItem.categoryName = categories[idx].name
      this.getProductsCatId(categories[idx].id).then(products => {
        menuItem.products = products
      })
      this.menu.push(menuItem)
    })
    return this.menu
  }


  getProductsCatId(catId): Promise<Array<Product>> {
    return new Promise((resolve, reject) => {
      this.prodService.init(this.providerId, catId)
      this.prodService.getProducts().subscribe(products => {        
        resolve(products)
      })
    })
  }
  
}