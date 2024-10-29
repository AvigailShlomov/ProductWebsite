import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Category, Freshness, Product } from '../../Modals/app-modals';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { ShearedService } from 'src/app/services/sheared.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    NgFor
  ]
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
    comment: ['', [Validators.required, Validators.maxLength(250)]],
    date: ['', [Validators.required,this.isValidDate]],
  });
  buttonAction: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private shearedService: ShearedService,
    @Inject(MAT_DIALOG_DATA) public editData: Product
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
              this.dialogRef.close('save');
              alert("Product added sucssesfuly");
              this.shearedService.resetProducts();
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
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: ((res) => {
          this.productForm.reset();
          this.dialogRef.close('update');
          alert("Product updated sucssesfuly");
          
          this.shearedService.resetProducts();
        }),
        error: () => {
          alert("Error while updating the product")
        }
      })
  }

  isValidDate(dateControl: AbstractControl): ValidationErrors | null {
    const date = new Date(dateControl.value);
    const today = new Date();

    if (date > today) {
      return { invalidDate: true }
    }
    else
      return null;
  }


}
