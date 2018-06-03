import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Provider } from './provider';


@Injectable()
export class ProviderService {

  providersCollection: AngularFirestoreCollection<any>;  
  providers: Observable<any[]>;
  providerDoc: AngularFirestoreDocument<Provider>;

  constructor(private afs: AngularFirestore) { 

    /*const settings = {timestampsInSnapshots: true};
    afs.firestore.settings(settings);*/

    this.providersCollection = this.afs.collection(`providers`);

    this.providers = this.providersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Provider;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getProviders() {
    return this.providers;
  }

  updateProvider(provider: Provider) {
    this.providerDoc = this.afs.doc(`providers/${provider.id}`);
    this.providerDoc.update(provider);    
  }

  /*getProviderDetails(id) {
    //this.providerDoc = this.afs.doc(`providers/${id}`);
    this.providerDoc = this.afs.doc(`providers/${this.userId}/list/${id}`);
    return this.providerDoc;
  }*/
}