import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'

import { StarService } from '../../shared/star.service'
import { Observable } from 'rxjs/Observable';

import { User } from '../../shared/user'


@Component({
  selector: 'app-provider-details',
  templateUrl: './details-provider.component.html',
  styleUrls: ['./details-provider.component.css']
})
export class DetailsProviderComponent implements OnInit {

  provider: any
  stars: Observable<any>
  avgRating: Observable<any>
  remarks: string

  user: User

  authState: any = null

  constructor(private broadcastObjService: BroadcastObjectService,
    private starService: StarService,
    private afAuth: AngularFireAuth) {

    this.remarks = ''

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });

  }

  ngOnInit() {

    if (this.authenticated) {
      this.broadcastObjService.currentUser.subscribe(user => {
        this.user = user
      })
    }

    this.broadcastObjService.currentProvider.subscribe(provider => {
      this.provider = provider
      this.stars = this.starService.getMovieStars(provider.id)
      this.avgRating = this.stars.map(arr => {
        const ratings = arr.map(v => v.value)
        return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
      })
    })
  }

  starHandler(value) {
    if (this.authenticated) {
      this.starService.setStar(this.user.uid, this.user.displayName, this.user.photoURL, this.provider.id, value, this.remarks)
    }
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  formatDate(date): string {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

}