import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/product.service'
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Landing page */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /** Itemarray */
  productCards: any = [];
  /** Ascending sortation by productName*/
  public sort: string = "productname:asc";

  public search = "";

  constructor(private _productService: ProductService, private _shoppingCartService: ShoppingCartService, private _snackBar: MatSnackBar) { }

  /** Show products on initialisation of home component */
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this._productService.getProducts(this.sort).subscribe({
      next: res => {
        this.productCards = res
      }
    })
  }
  searchProduct() {
    this._productService.searchProduct(this.search).subscribe({
      next: res => {
        this.productCards = res
      }
    })
  }

  buyProduct(product: any) {
    this._shoppingCartService.addToShoppingCart(product);
    this._snackBar.open(product.productname + " --> Shoppingcart");
  }
}

