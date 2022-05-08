import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dogschool-crm';
  mode: string = 'dark';


  toggleMode() {
    if (this.mode == 'dark') {
      this.mode = 'light';
      document.body.classList.add('dark-mode');
    } else {
      this.mode = 'dark';
      document.body.classList.remove('dark-mode');
    }
  }
}
