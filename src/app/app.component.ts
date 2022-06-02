import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { filter } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { FilterStringService } from 'src/services/filter-string.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subItems = false;//second level nav items hidden
  searchString: string = '';
  mobileQuery: MediaQueryList;

  // constructor(public myAuth: AuthenticationService, public filter: FilterStringService) { }


  private _mobileQueryListener: () => void;

  constructor(public myAuth: AuthenticationService,
    public filter: FilterStringService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    
    //check if screen width is too small for showing sidenav
    this.mobileQuery = media.matchMedia('(max-width: 870px)');
    console.log('mobileQuery',this.mobileQuery);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
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
