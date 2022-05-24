import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { filter } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { FilterStringService } from 'src/services/filter-string.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dogschool-crm';
  // mode: string = 'dark';
  subItems = false;//second level nav items hidden
  darkMode = false;//light mode active
  searchString: string = '';

  constructor(public myAuth: AuthenticationService,public filter:FilterStringService) { }

  toggleMode(state: MatSlideToggleChange) {
    if (state.checked) {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    } else {
      this.darkMode = false;
      document.body.classList.remove('dark-mode');
    }
  }


  /**
   * toggles between showing and hiding second level nav items
   */
  toggleSubItems() {
    this.subItems = !this.subItems;
  }

  
  /**
   * hides second level nav items
   */
  closeSubItems() {
    this.subItems = false;
  }


  /**
   * updates the filter string for the filter pipe 
   */
  changeFilter() {
    this.filter.filterSource.next(this.searchString.trim().toLowerCase());
  }


  /**
   * empties the search field and updates the filter string for the filter pipe
   */
  deleteSearch() {
    this.searchString = '';
    this.changeFilter();
  }


  /**
   * logout of the current user so that access is restricted to components without data
   */
  logout() {
    this.myAuth.logout();
  }
}
