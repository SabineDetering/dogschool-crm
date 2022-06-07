import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { deleteUser, getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userID: string;
  navigationTarget = '/dashboard';

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private _snackBar: MatSnackBar) { }


  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }


  signup(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate([this.navigationTarget]);
        this.userID = user.user.uid;
        this.openSnackBar('You are logged in successfully.');
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log('error code: ', errorCode,' errorMessage: ', errorMessage);
        if (errorCode == 'auth/weak-password') {
          this.openSnackBar('The password is too weak.');
        } else {
          this.openSnackBar(errorMessage);
        }
      })
      ;
  }


  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate([this.navigationTarget]);
        this.userID = user.user.uid;
        this.openSnackBar('You are logged in successfully.');
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log('error code: ', errorCode, ' errorMessage: ', errorMessage);
        if (errorCode == 'auth/wrong-password') {
          this.openSnackBar('Wrong password.');
        } else if (errorCode == 'auth/user-not-found') {
          this.openSnackBar('This email is not registered.');
        }
        else {
          this.openSnackBar(errorMessage);
        }
      })
  }


  guestLogin() {
    firebase.auth().signInAnonymously()
      .then((user) => {
        this.router.navigate([this.navigationTarget]);
        this.userID = user.user.uid;
        this.openSnackBar('You were logged in as guest.');
      });
  }


  async logout() {
    let user = await this.auth.currentUser;
    this.auth.signOut();
    this.userID = '';
    this.openSnackBar('You were logged out.');
    //delete user from firebase if anonymous
    if (!user.email ) {
      deleteUser(user).then(() => {
        console.log('guest user deleted');
      }).catch((error) => {
        console.log(error);
      });
    }
  }

}
