import { ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationDialogComponent {

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string }) { }
}



