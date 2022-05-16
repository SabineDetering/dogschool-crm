import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(public auth: AngularFireAuth) {
  }

  signup(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
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


  login(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
      })
  }


  guestLogin() {
    firebase.auth().signInAnonymously();
  }

  logout() {
    this.auth.signOut();
  }

}
