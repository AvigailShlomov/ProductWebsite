import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class ProductDialogComponent {

  /** @todo: change this to valid categories */
  categories: Category[] = [
    { value: 'Electronics-0', viewValue: 'Electronics' },
    { value: 'Food-1', viewValue: 'Food' },
    { value: 'pictures-2', viewValue: 'Pictures' },
  ];
  /**@todo: add verfications to the Datepicker */

  freshnessList: string[] = ["New", "Seconed Hand", "Reforbished"];
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  addProduct(){
    console.log(this.productForm.value);
  }


}
