import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Product } from './product';
//import { Upload } from '../../shared/upload'

@Injectable()
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  /*imagesCollection: AngularFirestoreCollection<Upload>;
  images: Observable<Upload[]>;*/

  providerId: string;
  categoryId: string;

  constructor(private afs: AngularFirestore) { }


  init(providerId: string, categoryId: string) {
    this.providerId = providerId;
    this.categoryId = categoryId;

    this.productsCollection = this.afs.collection(`products/${this.providerId}/list/${this.categoryId}/list`);
    this.products = this.productsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getProducts() {
    return this.products
  }

  getProductDetails(id) {
    this.productDoc = this.afs.doc(`products/${this.providerId}/list/${this.categoryId}/list/${id}`)
    return this.productDoc
  }

  /*getProductImages(id){
    this.imagesCollection = this.afs.collection(`uploads/${id}/images/`);
    this.images = this.imagesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Upload;
        data.id = a.payload.doc.id;
        return data;
      });
    });    
  }
  getImages(){
    return this.images
  }*/
}