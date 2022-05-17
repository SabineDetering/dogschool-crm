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
    if (this.myAuth.auth.user) {
      console.log('access allowed');
      return true;
    } else {
      console.log('access denied');
      window.alert("You don't have permission to view this page");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
