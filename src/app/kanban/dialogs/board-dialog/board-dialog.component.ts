import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardDialogComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: any
  ) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
