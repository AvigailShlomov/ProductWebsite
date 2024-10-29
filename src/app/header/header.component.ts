import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDialogComponent } from '../Dialogs/product-dialog/product-dialog.component';
import { ShearedService } from '../services/sheared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,
    ProductDialogComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private shearedService: ShearedService) { }

  openDialog() {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      height: '85%'
    }).afterClosed()
      .subscribe(val => {
        if (val == 'save') {
          this.shearedService.resetProducts();
        }
      })
  }
}
