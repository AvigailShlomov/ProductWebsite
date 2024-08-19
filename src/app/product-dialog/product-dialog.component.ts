import { Component } from '@angular/core';

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

/** @todo: change this to valid ctegories */
  categories: Category[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  /**@todo: add verfications to the Datepicker */

}
