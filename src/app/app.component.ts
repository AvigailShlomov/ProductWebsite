import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductDialogComponent } from './Dialogs/product-dialog/product-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { map, Observable } from 'rxjs';
import { GUI_MESSAGES, Product, PRODUCT_HEADLINE } from './Modals/app-modals';
import { NotificationDialogComponent } from './Dialogs/notification-dialog/notification-dialog.component';
import { ShearedService } from './services/sheared.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    ProductDialogComponent,
    HeaderComponent,
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

  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filteredProducts$!: Observable<Product[]>;

  constructor(
    private dialog: MatDialog,
    private http: ApiService,
    private shearedService: ShearedService
  ) { }

  ngOnInit() {
    this.shearedService.resetProducts();

    this.shearedService.filteredProducts$.subscribe((products: Product[]) => {
      this.dataSource.data = products;
    });
  }

  ngAfterViewInit() {
    // Bind the paginator and sort to the MatTableDataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(product: Product) {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      data: product
    }).afterClosed()
      .subscribe(val => {
        if (val == 'update') {
          console.log("PRESS UPDATE BTN");

          this.shearedService.resetProducts();

        }
      })
  }

  deleteProduct(id: number) {
    this.http.deleteProduct(id)
      .subscribe({
        next: (res) => {
          this.openNotificationDialog(GUI_MESSAGES.SUCCESS,
            GUI_MESSAGES.DATA_DELETED_SUCCESS);
          this.shearedService.resetProducts();
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
