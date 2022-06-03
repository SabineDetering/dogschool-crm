import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private myAuth: AuthenticationService, private router: Router) { };

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.myAuth.userID) {
      console.log('access allowed',this.myAuth.userID);
      return true;
    } else {
      console.log('access denied');
      this.myAuth.openSnackBar("You don't have permission to view that page. Please log in.");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
