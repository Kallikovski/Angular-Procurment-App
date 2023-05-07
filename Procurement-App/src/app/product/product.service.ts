import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/** Product specific http requests */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _productURL = "http://localhost:3000/product";
  private _productSearchURL = "http://localhost:3000/product/search";
  private _productListURL = "http://localhost:3000/product/list";


  constructor(private http: HttpClient) { }

  /** Returns the observable of the getProduct http request */
  public getProducts(sort: string): Observable<any[]> {
    const params = new HttpParams()
      .set('sort', sort);
    return this.http.get<any>(`${this._productURL}?${params.toString()}`).pipe(
      tap(data => {
        return data
      })
    )
  }

  /** Returns the observable of the searchProduct http request */
  public searchProduct(search: string): Observable<any[]> {
    const params = new HttpParams()
      .set('productname', search);
    return this.http.get<any>(`${this._productSearchURL}?${params.toString()}`).pipe(
      tap(data => {
        console.log(data)
        return data
      })
    )
  }

  /** Returns the observable of the getUserProducts http request */
  public getUserProducts(sort: string): Observable<any[]> {
    const params = new HttpParams()
      .set('sort', sort);
    return this.http.get<any>(`${this._productListURL}?${params.toString()}`).pipe(
      tap(data => {
        return data
      })
    )
  }

  /** Returns the observable of the createProducts http request */
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this._productURL, product).pipe(
      tap(data => {
        return data
      })
    )
  }

  /** Returns the observable of the updateProduct http request */
  updateProduct(productUpdate: any, _id: any): Observable<any> {
    const params = new HttpParams()
      .set('_id', _id)
    return this.http.put<any>(`${this._productURL}?${params.toString()}`, productUpdate).pipe(
      tap(data => {
        return data
      })
    )
  }

  /** Returns the observable of the deleteProduct http request */
  deleteProduct(productID: any): Observable<any> {
    const params = new HttpParams()
      .set('_id', productID);
    return this.http.delete<any>(`${this._productURL}?${params.toString()}`).pipe(
      tap(data => {
        return data
      })
    )
  }

  /** Returns the observable of the getProductList http request */
  getProductList(sort: string) {
    const params = new HttpParams()
      .set('sort', sort)
    this.http.get<any>(`${this._productListURL}?${params.toString()}`).subscribe(res => console.log(res))
  }

}
