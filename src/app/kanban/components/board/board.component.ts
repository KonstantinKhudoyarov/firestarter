import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Board } from "../../models";
import { BoardService } from "../../services/board.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {

  constructor(private readonly boardsService: BoardService) {}

  @Input() board?: Board;

  public taskDrop(e: CdkDragDrop<string[]>): void {
    const tasks = this.board?.tasks;
    const id = this.board?.id;
    if (tasks && id) {
      moveItemInArray(tasks, e.previousIndex, e.currentIndex);
      this.boardsService.updateTasks(id, tasks as Task[]);
    }
  }

}
