import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { CategoryService } from '../shared/category.service'
import { Order } from '../../order/shared/order'

import { Upload } from '../../shared/upload'

import { BroadcastObjectService } from '../../shared/broadcast-object.service'

//import { OrderService } from '../../order/shared/order.service'
import { ImagesService } from '../../shared/images.service'

import { AngularFirestoreDocument } from 'angularfire2/firestore';

import * as _ from 'lodash'

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
  providers: [ CategoryService, ImagesService ]
})

export class ListCategoriesComponent implements OnInit {

  providerId: any
  categories: any
  order: Order
  image: Upload
  doc: AngularFirestoreDocument<Upload>
  images: Array<Upload>

  constructor(private categoryService: CategoryService,
    private broadcastObjectService: BroadcastObjectService,
    private route: ActivatedRoute,
    private router: Router,
    private imagesService: ImagesService,
    ) {

    this.providerId = this.route.snapshot.params['provId']    
    this.categoryService.init(this.providerId)
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories
    })   
    this.broadcastObjectService.currentOrder.subscribe(order => {
      this.order = order
    }) 
  }

  showProducts(id) {
    this.router.navigate(['list-products', this.providerId, id])
  }

  isSelected(categoryId): boolean{
    return !_.isEmpty(this.order.products.get(categoryId))                   
  }
  

  saveOrder(){
    //this.orderService.init(this.providerId)
    //this.orderService.addOrder(this.order)  
    this.router.navigate(['orders'])
  }

}