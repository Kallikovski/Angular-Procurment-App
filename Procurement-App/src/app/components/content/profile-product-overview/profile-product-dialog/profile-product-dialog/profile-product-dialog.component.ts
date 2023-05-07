import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from 'src/app/product/product.service';

/** Product dialog which contains the informations that are changeable */
@Component({
  selector: 'app-profile-product-dialog',
  templateUrl: './profile-product-dialog.component.html',
  styleUrls: ['./profile-product-dialog.component.scss']
})
export class ProfileProductDialogComponent implements OnInit {

  public productCreationForm = new FormGroup({
    productname: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
  });

  dialogHeader: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ProfileProductDialogComponent>, private _productService: ProductService, public translate: TranslateService) {
    this.dialogHeader = translate.currentLang == "en" ? "Create Product" : "Produkt erstellen";
    if (data) {
      this.dialogHeader = this.dialogHeader = translate.currentLang == "en" ? "Update Product" : "Produkt aktualisieren";
      this.productCreationForm.controls.productname.setValue(data.productname);
      this.productCreationForm.controls.price.setValue(data.price);
      this.productCreationForm.controls.description.setValue(data.description);
    }
  }

  ngOnInit(): void {
  }

  /** Creates a product with the given informations */
  createProduct() {
    console.log(this.productCreationForm.controls)
    this._productService.createProduct(
      {
        productname: this.productCreationForm.controls.productname.value,
        price: this.productCreationForm.controls.price.value,
        description: this.productCreationForm.controls.description.value,
      }
    ).subscribe({
      next: (res: any) => {
        console.log(res)
        this.dialogRef.close(true);
      }, error(msg) {
        console.log(msg);
      }
    });
  }

  /** Creates a product with the given informations */
  updateProduct() {
    console.log(this.productCreationForm.controls)
    this._productService.updateProduct(
      {
        productname: this.productCreationForm.controls.productname.value,
        price: this.productCreationForm.controls.price.value,
        description: this.productCreationForm.controls.description.value,
      },
      this.data._id
    ).subscribe({
      next: (res: any) => {
        console.log(res)
        this.dialogRef.close(true);
      }, error(msg) {
        console.log(msg);
      }
    });
  }

  /** Closes the dialog */
  closeProductDialog() {
    this.dialogRef.close(false);
  }

}
