import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface Star{
  userId: any
  userDisplayName: any
  userProfilePic: any
  entityId: any
  value: number
  remarks: any
  postedDate: Date
}

@Injectable()
export class StarService {

  constructor(private afs: AngularFirestore) { }  

  // Star reviews that belong to a user
  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId).orderBy('postedDate', 'desc'));
    return starsRef.valueChanges();
  }

  // Get all stars that belog to a Movie
  getMovieStars(entityId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('entityId', '==', entityId).orderBy('postedDate', 'desc'));
    return starsRef.valueChanges();
  }

  // Create or update star
  setStar(userId, userDisplayName, userProfilePic, entityId, value, remarks) {
    // Star document data
    var postedDate = new Date()
    const star: Star = { userId, userDisplayName, userProfilePic, entityId, value, remarks, postedDate};

    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.entityId}`;

    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }

}