import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/* Product confirmation dialog */
@Component({
  selector: 'app-product-confirmation-dialog',
  templateUrl: './product-confirmation-dialog.component.html',
  styleUrls: ['./product-confirmation-dialog.component.scss']
})
export class ProductConfirmationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ProductConfirmationDialogComponent>) { }

  ngOnInit(): void {
  }
  /* Cofirm and close the dialog */
  confirm() {
    this.dialogRef.close(true);
  }
  /* Cancel and close the dialog */
  cancel() {
    this.dialogRef.close(false);
  }

}
