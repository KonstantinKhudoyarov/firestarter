import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BoardService } from "../../services/board.service";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDialogComponent {

  constructor(
    public readonly dialogRef: MatDialogRef<TaskDialogComponent>,
    private readonly boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public readonly data: any
  ) {}

  public readonly labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public handleTaskDelete() {
    this.boardService.removeTask(this.data.boardId, this.data.task);
    this.dialogRef.close();
  }
}
