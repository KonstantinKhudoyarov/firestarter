import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Board, Task } from "../../models";
import { BoardService } from "../../services/board.service";
import { MatDialog } from "@angular/material/dialog";
import { TaskDialogComponent } from "../../dialogs/task-dialog/task-dialog.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {

  constructor(
    private readonly boardService: BoardService,
    private dialog: MatDialog
  ) {}

  @Input() board!: Board;

  public taskDrop(e: CdkDragDrop<string[]>): void {
    const tasks = this.board?.tasks;
    const id = this.board?.id;
    if (tasks && id) {
      moveItemInArray(tasks, e.previousIndex, e.currentIndex);
      this.boardService.updateTasks(id, tasks);
    }
  }

  public openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board?.id, idx }
        : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          // @ts-ignore
          this.boardService.updateTasks(this.board.id, [
            // @ts-ignore
            ...this.board.tasks,
            result.task
          ]);
        } else {
          const update = this.board.tasks;
          // @ts-ignore
          update.splice(result.idx, 1, result.task);
          // @ts-ignore
          this.boardService.updateTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }
}
