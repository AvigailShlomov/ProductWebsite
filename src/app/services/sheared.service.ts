import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product, GUI_MESSAGES } from '../Modals/app-modals';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../Dialogs/notification-dialog/notification-dialog.component';


@Injectable({
    providedIn: 'root'
})
export class ShearedService {

    products$!: Observable<Product[]>;

    constructor(private http: ApiService,
        // private dialog: MatDialog
    ) { }

    getAllProducts(): Observable<Product[]> {
        return this.http.getProduct().pipe(
            catchError(err => {
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
        );

    }

    refreshProducts() { /**@todo: maybe rename this */
        this.products$ = this.getAllProducts();
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
