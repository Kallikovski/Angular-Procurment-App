import { Injectable } from '@angular/core';

/* Shopping cart specific functions */
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  /** add a item to shopping cart */
  public addToShoppingCart(item: any) {
    const items: any[] = JSON.parse(localStorage.getItem("items") || "[]");
    items.push(item)
    localStorage.setItem('items', JSON.stringify(items));
  }

  /** return the items of the shopping cart */
  public getShoppingCart(): any[] {
    const items: any[] = JSON.parse(localStorage.getItem("items") || "[]");
    return items;
  }

  /** deletes all items in the shopping cart */
  public clearShoppingCart() {
    localStorage.setItem('items', JSON.stringify([]));
  }

}
