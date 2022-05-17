import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dogschool-crm';
  mode: string = 'dark';
  subItems = false;

  darkMode = false;

  constructor(public myAuth:AuthenticationService){}

  toggleMode(state: MatSlideToggleChange) {
    if (state.checked) {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    } else {
      this.darkMode = false;
      document.body.classList.remove('dark-mode');
   }
  }

  toggleSubItems() {
    this.subItems = !this.subItems;
  }


  logout() {
    this.myAuth.logout();
  }
}
