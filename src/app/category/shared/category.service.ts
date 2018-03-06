import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Category } from './category';

@Injectable()
export class CategoryService {

  categoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;
  categoryDoc: AngularFirestoreDocument<Category>;

  providerId: string;

  constructor(private afs: AngularFirestore) {
  }

  init(providerId: string) {
    this.providerId = providerId;
    this.categoriesCollection = this.afs.collection(`categories/${this.providerId}/list`);
    this.categories = this.categoriesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }


  getCategories() {
    return this.categories;
  }

  getCategoryDetails(id) {
    this.categoryDoc = this.afs.doc(`categories/${this.providerId}/list/${id}`);
    return this.categoryDoc;
  }  

}