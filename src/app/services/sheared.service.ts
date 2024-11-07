import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Product, GUI_MESSAGES } from '../Modals/app-modals';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../Dialogs/notification-dialog/notification-dialog.component';


@Injectable({
    providedIn: 'root'
})
export class ShearedService {

    products$!: Observable<Product[]>;
    private filteredProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    filteredProducts$: Observable<Product[]> = this.filteredProductsSubject.asObservable();

    constructor(private http: ApiService,
        // private dialog: MatDialog
    ) { }

    getAllProducts() {
      return  this.http.getProduct().pipe(
            tap((product) => this.filteredProductsSubject.next(product))
            , catchError(err => {
                // this.dialog.open(NotificationDialogComponent, {
                //     width: '30%',
                //     data: {
                //         title: GUI_MESSAGES.SERVER_ERROR,
                //         content: GUI_MESSAGES.DATA_RECEIVED_FAIL
                //     },
                // });
                // this.openNotificationDialog(GUI_MESSAGES.SERVER_ERROR,
                //     GUI_MESSAGES.DATA_RECEIVED_FAIL);

                return of([]);
            })
        )
            .subscribe()
    }

    updateFilteredProducts(products: Product[]) {
        this.filteredProductsSubject.next(products);
    }

    resetProducts() {
        this.getAllProducts();
        // this.products$ = this.getAllProducts();
        // this.filteredProducts$ = this.getAllProducts();
        // this.filteredProductsSubject.next(this.getAllProducts())
    }
    // openNotificationDialog(dialog: MatDialog, title: string, content: string) {
    //     dialog.open(NotificationDialogComponent, {
    //         width: '30%',
    //         data: {
    //             title: title,
    //             content: content
    //         },
    //     });
    // }
}
