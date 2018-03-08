import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BroadcastObjectService } from '../app/shared/broadcast-object.service'
import { Router } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as _ from 'lodash'
import * as firebase from 'firebase/app';
import { User } from '../app/shared/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';
  user: User

  userAuthState: Observable<firebase.User>;

  authState: any = null;

  @ViewChild("drawer")
  public drawer: MatDrawer;

  someMethod(event) {  
    if(event == 'close'){
      this.drawer.close()
    }
    else
      this.drawer.toggle()    
  }

  orders(){
    this.router.navigate(['/list-orders']);
    this.drawer.close()  
  }

  constructor(private broadcastObjectService: BroadcastObjectService,
    private afAuth: AngularFireAuth,
    private router: Router) {
    this.userAuthState = afAuth.authState
  }

  ngOnInit() {   
    this.broadcastObjectService.currentUser.subscribe(user => {
      this.user = user;
    })   

    var savedUser = JSON.parse(localStorage.getItem('user'))
    if (!_.isEmpty(savedUser)) {
      this.user = savedUser;
      this.broadcastObjectService.broadcastUser(savedUser);
    }

    this.broadcastObjectService.currentAction.subscribe(action => {
      this.drawer.toggle();
    })

  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((success) => {
      this.user.uid = success.user.uid;
      this.user.displayName = success.user.displayName
      this.user.photoURL = success.user.providerData[0].photoURL

      
      localStorage.setItem('user', JSON.stringify(this.user));
      this.broadcastObjectService.broadcastUser(this.user);
    }
    ).catch((err) => {
      console.log(err);
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user
          //this.updateUserData()
      })
      .catch(error => console.log(error));
  }


  logout() {
    this.afAuth.auth.signOut().then((success) => {
      localStorage.removeItem('user');
      this.broadcastObjectService.broadcastUser({});
      this.router.navigate(['']);
      this.drawer.close()
    }
    ).catch((err) => {
      console.log(err);
    });
  }
}