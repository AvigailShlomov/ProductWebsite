import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, Freshness, Product } from '../Modals/app-modals';



/**@todo: make this a standalone comp */
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],

})
export class ProductDialogComponent implements OnInit {

  /**@todo: add verfications to the Datepicker */
  categories: Category[] = [Category.ELECTRONICS, Category.FOOD, Category.PICTURES];
  freshnessList: Freshness[] = [Freshness.NEW, Freshness.SECONED_HAND, Freshness.REFORBISHED];
  productForm: FormGroup = this.formBuilder.group({
    productName: ['', Validators.required],
    category: ['', Validators.required],
    freshness: ['', Validators.required],
    price: ['', Validators.required],
    comment: ['', Validators.required],
    date: ['', Validators.required],
  });
  buttonAction: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: Product,
    private dialogRef: MatDialogRef<ProductDialogComponent>
  ) { }

  ngOnInit() {
    if (this.editData) {

      this.buttonAction = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }


  addProduct() {

    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: ((res) => {
              this.productForm.reset();
              this.dialogRef.close('save')
              alert("Product added sucssesfuly");
            }),
            error: () => {
              alert("Error while adding a new product")
            }
          })
      }
    }
    else {// in edit mode
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value,this.editData.id)
      .subscribe({
        next: ((res) => {
          this.productForm.reset();
          this.dialogRef.close('update')
          alert("Product updated sucssesfuly");
        }),
        error: () => {
          alert("Error while updating the product")
        }
      })
  }


}
