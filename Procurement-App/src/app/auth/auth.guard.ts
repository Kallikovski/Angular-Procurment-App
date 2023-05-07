import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Authentication Guard preventing not logged in users from accessing specific URLs*/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn = false

  constructor(private _auth: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  /** Redirects user depending on his login state*/
  checkLogin(url: string): true | UrlTree {
    this._auth.getIsLoggedInObserver().subscribe((data: any) => { this.loggedIn = data })
    if (this.loggedIn) {
      return true;
    }
    // Store the attempted URL for redirecting
    this._auth.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }
}
