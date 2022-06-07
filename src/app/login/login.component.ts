import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinEmail: string;
  loginEmail: string;
  signinPassword: string;
  loginPassword: string;
  guest: boolean;
  userID: string;

  constructor(public myAuth: AuthenticationService) {
  }


  ngOnInit(): void { }


  login() {
    this.myAuth.login(this.loginEmail, this.loginPassword);
  }


  signup() {
    this.myAuth.signup(this.signinEmail, this.signinPassword);
  }


  guestLogin() {
    this.myAuth.guestLogin();
  }


  logout() {
    this.myAuth.logout();
  }
}

