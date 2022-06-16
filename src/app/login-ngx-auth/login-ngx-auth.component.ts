import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-ngx-auth',
  templateUrl: './login-ngx-auth.component.html',
  styleUrls: ['./login-ngx-auth.component.scss']
})
export class LoginNgxAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  printUser(event) {
    console.log(event);
  }

  printError(event) {
    console.error(event);
  }
}
