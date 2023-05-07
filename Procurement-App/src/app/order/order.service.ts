import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

/** Order specific http requests */
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _orderURL = "http://localhost:3000/order";

  constructor(private http: HttpClient, private _shoppingCartService: ShoppingCartService) { }

  /** Returns the observable of the orderItems http request */
  public orderItems(): Observable<any> {
    return this.http.post<any>(this._orderURL, this._shoppingCartService.getShoppingCart())
  }

  /** Returns the observable of the updateOrder http request */
  public updateOrder(productUpdate: any, _id: any): Observable<any> {
    console.log("Confirm Order")
    const params = new HttpParams()
      .set('_id', _id)
    return this.http.put<any>(`${this._orderURL}?${params.toString()}`, productUpdate);
  }

  /** Returns the observable of the getOrders http request */
  public getOrders(sort: string): Observable<any> {
    const params = new HttpParams()
      .set('sort', sort);
    return this.http.get<any>(`${this._orderURL}?${params.toString()}`);
  }
}
