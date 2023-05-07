import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileProductDialogComponent } from './profile-product-dialog/profile-product-dialog/profile-product-dialog.component';
import { ProductConfirmationDialogComponent } from './product-confirmation-dialog/product-confirmation-dialog.component';
import { ProductService } from 'src/app/product/product.service';
import { OrderService } from 'src/app/order/order.service';
import { UserService } from 'src/app/user/user.service';

/** Product overview page containing all products of one user depending on his role */
@Component({
  selector: 'app-profile-product-overview',
  templateUrl: './profile-product-overview.component.html',
  styleUrls: ['./profile-product-overview.component.scss']
})
export class ProfileProductOverviewComponent implements OnInit {

  userRole: string = "";
  orderCards: any = [];
  /** Itemarray */
  productCards: any = [];
  /** Ascending sortation by productName*/
  public sort: string = "productname:asc";

  constructor(public dialog: MatDialog, private _productService: ProductService, private _userService: UserService, private _orderService: OrderService) {
    this._userService.getUser().subscribe({
      next: res => {
        this.userRole = res.role
        console.log(res.role)
        if (this.userRole != "Customer") {
          this.getProducts()
        }
        this.getOrders()
      }
    })
  }

  ngOnInit(): void {
  }

  /**  */
  getProducts() {
    console.log("Get Product")
    this._productService.getUserProducts(this.sort).subscribe({
      next: res => {
        this.productCards = res
        console.log(this.productCards)
      }
    })
  }
  openProductCreation() {
    console.log("OPEN")
    let dialogRef = this.dialog.open(ProfileProductDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      console.log('Dialog res: ' + res)
    })
  }
  editProductCreation(card: any) {
    console.log("OPEN")
    let dialogRef = this.dialog.open(ProfileProductDialogComponent, { data: card });
    dialogRef.afterClosed().subscribe(res => {
      console.log('Dialog res: ' + res)
    })
  }
  deleteProduct(_id: any) {
    console.log(_id)
    let dialogRef = this.dialog.open(ProductConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      console.log('Dialog res: ' + res)
      if (res == true) {
        this._productService.deleteProduct(_id).subscribe(res => {
          console.log(res)
          this.getProducts()
        })
      }
    })
  }
  getOrders() {
    this._orderService.getOrders(this.sort).subscribe({
      next: res => {
        this.orderCards = res
        console.log(this.orderCards)
      }
    })
  }
  confirmOrder(_id: any) {
    console.log(_id)
    let dialogRef = this.dialog.open(ProductConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      console.log('Dialog res: ' + res)
      if (res == true) {
        if (this.userRole == "Admin") {
          const update = { adminsigned: true };
          this._orderService.updateOrder(update, _id).subscribe(res => {
            this.getOrders()
            console.log(res)
          }, err => {
            this.getOrders()
            console.log(err)
          })
        }
        if (this.userRole == "Staff") {
          const update = { signed: true, status: "invoice" };
          this._orderService.updateOrder(update, _id).subscribe(res => {
            this.getOrders()
            console.log(res)
          }, err => {
            this.getOrders()
            console.log(err)
          })
        }
        if (this.userRole == "Customer") {
          const update = { status: "shipped" };
          this._orderService.updateOrder(update, _id).subscribe(res => {
            this.getOrders()
            console.log(res)
          }, err => {
            this.getOrders()
            console.log(err)
          })
        }
      }
    })
  }
  cancelOrder(_id: any) {
    console.log(_id)
    let dialogRef = this.dialog.open(ProductConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      console.log('Dialog res: ' + res)
      if (res == true) {
        const update = { status: "cancelled" };
        this._orderService.updateOrder(update, _id).subscribe(res => {
          this.getOrders()
          console.log(res)
        }, err => {
          this.getOrders()
          console.log(err)
        })
      }
    })
  }
}
