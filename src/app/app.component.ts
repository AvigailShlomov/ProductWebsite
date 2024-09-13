import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private http: ApiService
  ) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  openDialog() {
    this.dialog.open(ProductDialogComponent, {
      width: '30%'
    });
  }

  getAllProducts() {
    this.http.getProduct()
      .subscribe({
        next: (res) => {
          console.log("product List: ", res);
        },
        error: (error) => {
          alert("err whle fetching products")
        }
      })
  }
}
