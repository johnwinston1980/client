import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProviderService } from '../provider/shared/provider.service'

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Provider } from '../provider/shared/provider'

export interface Star {
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

  stars: Observable<any>
  avgRating: Observable<any>

  constructor(private afs: AngularFirestore, private providerService: ProviderService) { }

  // Star reviews that belong to a user
  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId).orderBy('postedDate', 'desc'));
    return starsRef.valueChanges();
  }

  // Get all stars that belong to a Movie
  getMovieStars(entityId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('entityId', '==', entityId).orderBy('postedDate', 'desc'));
    return starsRef.valueChanges();
  }

  // Create or update star
  setStar(userId, userDisplayName, userProfilePic, entityId, value, remarks) {
    // Star document data
    var postedDate = new Date()
    const star: Star = { userId, userDisplayName, userProfilePic, entityId, value, remarks, postedDate };
    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.entityId}`;
    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }


  updateProvider(provider): Promise<Provider> {   
    return new Promise((resolve, reject) => {
      var rating
      var reviews
      this.stars = this.getMovieStars(provider.id)
      this.stars.map(arr => {
        const ratings = arr.map(v => v.value)
        reviews = arr.length
        rating = ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 0
        provider.reviews = reviews
        provider.rating = rating
        return provider
      }).subscribe(result => {
        resolve(result)
      })
    })
  }

  updateRating(provider) {
    this.updateProvider(provider).then(result => {
      this.providerService.updateProvider(Object.assign({}, result))
    })    
  }
}