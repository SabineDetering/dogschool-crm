import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {

  constructor(public auth: AngularFireAuth, private router: Router) { }


  signup(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { this.router.navigate(['/clients']); })
      .catch((error)=> {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });   

  }


  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => { this.router.navigate(['/clients']); })
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })
  }


  guestLogin() {
    firebase.auth().signInAnonymously()
      .then(() => { this.router.navigate(['/clients']); });
  }

  logout() {
    this.auth.signOut();
  }

}
