import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { OrderService } from 'src/app/order/order.service';
import { UserService } from 'src/app/user/user.service';

/** Shopping cart page connects the UI to the shopping cart service */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  items: any[] = [];
  sum: number = 0;
  isCustomer = false;



  constructor(private _shoppingCartService: ShoppingCartService, private _orderService: OrderService, private _userService: UserService) {
    this.items = _shoppingCartService.getShoppingCart();
    this.sum = this.calculateSum()
    _userService.getUser().subscribe(
      res => {
        if (res.role == "Customer") {
          this.isCustomer = true;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
  }

  /** Calculates the sum of the product prices */
  calculateSum() {
    let sum: number = 0;
    this.items.forEach(item => {
      sum += item.price
    });
    return sum;
  }

  /** Orders the products */
  orderItems() {
    this._orderService.orderItems().subscribe({
      next: (res: any) => {
        console.log(res)
        this._shoppingCartService.clearShoppingCart();
        this.items = this._shoppingCartService.getShoppingCart();
        this.sum = 0;
      }, error(msg) {
        console.log(msg);
      }
    });
  }

  /** Clears the shopping cart */
  clearCart() {
    this._shoppingCartService.clearShoppingCart();
    this.items = this._shoppingCartService.getShoppingCart();
    this.sum = this.calculateSum()
  }

}
