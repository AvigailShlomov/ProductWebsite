import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price', 'date', 'comment', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private http: ApiService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(ProductDialogComponent, {
      width: '30%'
    }).afterClosed()
      .subscribe(val => {
        if (val == 'save') {
          this.getAllProducts();
        }
      })
  }

  getAllProducts() {
    this.http.getProduct()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (error) => {
          alert("err while fetching products");
          console.log("get products error: ", error);

        }
      })
  }

  editProduct(product: any) {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      data: product
    }).afterClosed()
      .subscribe(val => {
        if (val == 'update') {
          this.getAllProducts();
        }
      })
    console.log("product ", product);
  }

  deleteProduct(id: string) { // should be a number
    this.http.deleteProduct(id)
      .subscribe({
        next: (res) => {
          alert("delete sucsses");
          this.getAllProducts();
        },
        error: (res) => {
          alert("error while deleting");
        }
      })
  }
}
