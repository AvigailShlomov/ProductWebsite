import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';

/**
 * @title Dialog elements
 */
// @Component({
//   selector: 'dialog-elements-example',
//   templateUrl: 'dialog-elements-example.html',
//   standalone: true,
//   imports: [MatButtonModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class DialogElementsExample {
//   readonly dialog = inject(MatDialog);

//   openDialog() {
//     this.dialog.open(ServerMassageDialogComponent);
//   }
// }


/**@todo: there are imports that are not standalone- fix it later */
@Component({
  selector: 'app-server-massage-dialog',
  templateUrl: './server-massage-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule,  MatButtonModule], //MatDialogContent, MatDialogActions, MatDialogClose,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerMassageDialogComponent {
  /**
   *
   */
  constructor(private dialog: MatDialog) {
   
    
  }
}



