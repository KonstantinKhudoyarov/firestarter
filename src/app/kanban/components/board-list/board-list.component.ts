import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { BoardService } from "../../services/board.service";
import { Board } from "../../models";

@UntilDestroy()
@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListComponent implements OnInit {

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly boardsService: BoardService
  ) {}

  public boards?: Board[];

  public ngOnInit(): void {
    this.boardsService.getBoards()
      .pipe(untilDestroyed(this))
      .subscribe(boards => {
        this.boards = boards;
        this.cdr.markForCheck();
      });
  }

  public drop(e: CdkDragDrop<string[]>): void {
    if(this.boards) {
      moveItemInArray(this.boards, e.previousIndex, e.currentIndex);
      this.boardsService.sortBoards(this.boards);
    }
  }
}
