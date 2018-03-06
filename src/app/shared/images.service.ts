import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Upload } from './upload'

@Injectable()
export class ImagesService {  

  imagesCollection: AngularFirestoreCollection<Upload>;
  images: Observable<Upload[]>;
  imageDoc: AngularFirestoreDocument<Upload>;  

  constructor(private afs: AngularFirestore) { }  

  init(id){
    this.imagesCollection = this.afs.collection(`uploads/${id}/images/`);
    this.images = this.imagesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Upload;
        data.id = a.payload.doc.id;
        return data;
      });
    });    
  }

  getImage(id) {
    this.imageDoc = this.afs.doc(`uploads/${id}`)
    return this.imageDoc
  }

  getImages(){
    return this.images
  }
}