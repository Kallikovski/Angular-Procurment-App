import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';

/** Service for handeling all user relevent registration and login requests, as well as user specific states*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/register";
  private _loginUrl = "http://localhost:3000/login";
  private _logoutUrl = "http://localhost:3000/logout";

  redirectUrl: string | null = null;

  isLoggedIn: BehaviorSubject<boolean>;
  userRole: BehaviorSubject<string>;

  constructor(private http: HttpClient, private router: Router, private _userService: UserService) {
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
    this.userRole = new BehaviorSubject<string>("none");
    this.loggedIn()
  }
  /** Returns the observable of the registerUser http request */
  registerUser(user: any): Observable<any[]> {
    console.log("Register User");
    return this.http.post<any>(this._registerUrl, user).pipe(
      tap(data => {
        this.setSession(data)
      })
    )
  }
  /** Returns the observable of the loginUser http request */
  loginUser(user: any): Observable<any> {
    console.log("login")
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap(data => {
        this.setSession(data)
        return data
      })
    )
  }
  /** Returns the observable of the logoutUser http request */
  logoutUser(): Observable<any> {
    console.log("logout")
    return this.http.post<any>(this._logoutUrl, {}).pipe(
      tap(data => {
        this.endSession()
        return data
      })
    )
  }
  /** Returns the observable of the getIsLoggedInObserver */
  public getIsLoggedInObserver(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  /** Returns the observable of the getUserRoleObserver */
  public getUserRoleObserver(): Observable<string> {
    return this.userRole.asObservable();
  }
  /** Sets the user login state and role */
  public loggedIn() {
    this.isLoggedIn.next(!!localStorage.getItem('token'));
    if (!!localStorage.getItem('token')) {
      this._userService.getUser().subscribe({
        next: res => {
          this.userRole.next(res.role)
        }
      })
    }
  }
  /** Removes login token from local storage */
  private endSession() {
    this.isLoggedIn.next(false);
    localStorage.removeItem("token");
    this.userRole.next("none")
    this.router.navigate(['home']);
  }
  /** Sets login token in local storage */
  private setSession(authResult: any) {
    this.isLoggedIn.next(true);
    localStorage.setItem('token', authResult.token);
    this.userRole.next(authResult.user.role)
    this.router.navigate(['home']);
  }
}
