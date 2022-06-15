import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { FilterStringService } from 'src/services/filter-string.service';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subItems = false;//second level nav items hidden
  searchString: string = '';
  mobileQuery: MediaQueryList;
  routeWithSearch: boolean;//condition for showing search field

  private _mobileQueryListener: () => void;

  constructor(public myAuth: AuthenticationService,
    public filter: FilterStringService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router) {

    //check if screen width is too small for showing sidenav
    this.mobileQuery = media.matchMedia('(max-width: 870px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);

    //get current route
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (['/clients', '/dogs', '/trainings'].includes(event.url)) {
            this.routeWithSearch = true;
          } else {
            this.routeWithSearch = false;
          }
          // this.currentRoute = event.url;
          console.log('currentRoute', event.url, this.routeWithSearch);
        }
      });
  }


  /**
   * toggles between showing and hiding second level nav items
   */
  toggleSubItems(event:Event) {
    event.stopPropagation();
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
