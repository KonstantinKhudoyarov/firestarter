import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { BoardService } from "../../services/board.service";
import { Board } from "../../models";
import { BoardDialogComponent } from "../../dialogs/board-dialog/board-dialog.component";

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
    private readonly boardsService: BoardService,
    private readonly dialog: MatDialog
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

  public openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: "400px",
      data: {}
    });

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        if(result) {
          this.boardsService.createBoard({
            title: result,
            priority: this.boards?.length
          });
        }
      })
  }
}
