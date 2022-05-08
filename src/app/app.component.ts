import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dogschool-crm';
  mode: string = 'dark';

  darkMode = false;


  // toggleMode() {
  //   if (this.mode == 'dark') {
  //     this.mode = 'light';
  //     document.body.classList.add('dark-mode');
  //   } else {
  //     this.mode = 'dark';
  //     document.body.classList.remove('dark-mode');
  //   }
  // }
  toggleMode(state: MatSlideToggleChange) {
    if (state.checked) {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    } else {
      this.darkMode = false;
      document.body.classList.remove('dark-mode');
   }
  }
}
