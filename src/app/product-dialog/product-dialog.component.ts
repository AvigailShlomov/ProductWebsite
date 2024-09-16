import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

interface Category {
  value: string;
  viewValue: string;
}

/**@todo: make this a standalone comp */
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],

})
export class ProductDialogComponent implements OnInit {

  /** @todo: change this to valid categories */
  categories: Category[] = [
    { value: 'Electronics-0', viewValue: 'Electronics' },
    { value: 'Food-1', viewValue: 'Food' },
    { value: 'pictures-2', viewValue: 'Pictures' },
  ];
  /**@todo: add verfications to the Datepicker */

  freshnessList: string[] = ["New", "Seconed Hand", "Reforbished"];

  productForm: FormGroup = this.formBuilder.group({
    productName: ['', Validators.required],
    category: ['', Validators.required],
    freshness: ['', Validators.required],
    price: ['', Validators.required],
    comment: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<ProductDialogComponent>
  ) { }

  ngOnInit() {
    // this.initForm()
  }
  
  initForm() {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  addProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
        .subscribe({
          next: ((res) => {
            this.productForm.reset();
            this.dialogRef.close('save')
            alert("Product added sucssesfuly");
          }),
          error: () => {
            alert("error wile adding the new product")
          }

        })
    }

  }


}
