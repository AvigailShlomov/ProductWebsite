import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductDialogComponent } from './Dialogs/product-dialog/product-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { catchError, map, Observable, of } from 'rxjs';
import { GUI_MESSAGES, Product, PRODUCT_HEADLINE } from './Modals/app-modals';
import { NotificationDialogComponent } from './Dialogs/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    ProductDialogComponent,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule
  ]
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    PRODUCT_HEADLINE.PRODUCT_NAME,
    PRODUCT_HEADLINE.CATEGORY,
    PRODUCT_HEADLINE.FRESHNESS,
    PRODUCT_HEADLINE.PRICE,
    PRODUCT_HEADLINE.DATE,
    PRODUCT_HEADLINE.COMMENT,
    PRODUCT_HEADLINE.ACTIONS];

  //dataSource = new MatTableDataSource<Observable<Product[]>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator; /**@todo: add pageinator */
  @ViewChild(MatSort) sort!: MatSort;/**@todo: add sort */
  products$!: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;

  constructor(
    private dialog: MatDialog,
    private http: ApiService
  ) { }

  ngOnInit() {
    this.products$ = this.getAllProducts();
    this.filteredProducts$ = this.products$;
  }

  applyFilter(searchTerm: string) {
    if (searchTerm == "") {

      this.filteredProducts$ = this.products$
    }
    else if (searchTerm == " ") {

      return;
    }
    else {
      this.filteredProducts$ = this.products$.pipe(
        map(products =>
          products.filter(product =>
            this.filterOnOneProduct(product, searchTerm)
          )
        )
      )
    }
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  /**@todo: does not work for numbers! */
  private filterOnOneProduct(product: Product, searchTerm: string): boolean {
    const term = searchTerm.trim().toLowerCase();

    return Object.values(product).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(term)
    );
  }

  openDialog() {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      height: '85%'
    }).afterClosed()
      .subscribe(val => {
        if (val == 'save') {
          this.products$ = this.getAllProducts();
        }
      })
  }


  getAllProducts(): Observable<Product[]> {
    return this.http.getProduct().pipe(
      catchError(err => {
        this.openNotificationDialog(GUI_MESSAGES.SERVER_ERROR,
          GUI_MESSAGES.DATA_RECEIVED_FAIL);

        return of([]);
      })
    );
    /**@todo: take care of sort and v and del this */
    // this.http.getProduct() 
    //   .subscribe({
    //     next: (res) => {
    //  this.dataSource = new MatTableDataSource(res);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     },
    //     error: (error) => {
    //       
    //     }
    //   })
  }

  editProduct(product: Product) {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      data: product
    }).afterClosed()
      .subscribe(val => {
        if (val == 'update') {
          this.products$ = this.getAllProducts();
        }
      })
  }

  deleteProduct(id: number) {
    this.http.deleteProduct(id)
      .subscribe({
        next: (res) => {
          this.openNotificationDialog(GUI_MESSAGES.SUCCESS,
            GUI_MESSAGES.DATA_DELETED_SUCCESS);
          this.products$ = this.getAllProducts();
        },
        error: (res) => {
          this.openNotificationDialog(GUI_MESSAGES.SERVER_ERROR,
            GUI_MESSAGES.DATA_DELETED_FAIL);
        }
      })
  }

  openNotificationDialog(title: string, content: string) {
    this.dialog.open(NotificationDialogComponent, {
      width: '30%',
      data: {
        title: title,
        content: content
      },
    });
  }

}
