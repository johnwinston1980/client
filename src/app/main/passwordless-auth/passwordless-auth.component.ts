import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../../shared/user'
import { BroadcastObjectService } from '../../shared/broadcast-object.service'

@Component({
  selector: 'app-passwordless-auth',
  templateUrl: './passwordless-auth.component.html',
  styleUrls: ['./passwordless-auth.component.css']
})
export class PasswordlessAuthComponent implements OnInit {
  
  //user: Observable<any>;
  user: User

  email: string;
  emailSent = false;

  errorMessage: string;

  constructor(
    public afAuth: AngularFireAuth, 
    private router: Router,
    private broadcastObjectService: BroadcastObjectService) {}

  ngOnInit() {
    //this.user = this.afAuth.authState;

    const url = this.router.url;

    this.confirmSignIn(url);
  }


  async sendEmailLink() {
    const actionCodeSettings = { 
      // Your redirect URL
      url: 'https://johnwinston1980.github.io/client/login', 
      handleCodeInApp: true, }
      
    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        this.email,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.email);
      this.emailSent = true;
    } catch (err) {
      this.errorMessage = err.message;
    }
  }
  

  async confirmSignIn(url) {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');
  
        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }
  
        
        // Signin user and remove the email localStorage
        const result = await this.afAuth.auth.signInWithEmailLink(email, url).then((success) => {
          this.user.uid = success.user.uid;
          this.user.displayName = success.user.displayName
          this.user.photoURL = success.user.providerData[0].photoURL
    
    
          localStorage.setItem('user', JSON.stringify(this.user));
          this.broadcastObjectService.broadcastUser(this.user);
        }
        ).catch((err) => {
          console.log(err);
        });

        window.localStorage.removeItem('emailForSignIn');
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }  
}