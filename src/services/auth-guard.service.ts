import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from 'firebase/auth';
import { map, Observable, take, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  user: any;

  constructor(private myAuth: AuthenticationService, private router: Router) {
    myAuth.auth.user.subscribe(user => this.user = user);
    console.log('user', this.user);
  };


  canActivate(): Observable<boolean> {
    return this.myAuth.auth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.myAuth.openSnackBar("Access was denied. Please log in.");
          this.router.navigate(['/login']);
        } 
      })
    );
  }

}
