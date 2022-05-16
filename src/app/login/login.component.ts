import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(public myAuth:AuthenticationService) {
  }


  ngOnInit(): void {
  }



  login() {
    this.myAuth.login(this.email,this.password)
  }

  signup() {
    this.myAuth.signup(this.email, this.password)
  }

  guestLogin() {
    this.myAuth.guestLogin()
  }

  logout() {
    this.myAuth.logout();
  }
}

