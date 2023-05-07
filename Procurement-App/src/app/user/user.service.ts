import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

/* User specific http requests */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userURL = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  /* Returns an observable for the getUser request */
  getUser(): Observable<any> {
    return this.http.get<any>(this._userURL)
  }

  /* Returns a observable for the updateUser request */
  updateUser(userUpdate: any): Observable<any> {
    return this.http.put<any>(this._userURL, userUpdate)
  }
}
