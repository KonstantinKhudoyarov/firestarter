import { Injectable } from "@angular/core";
import { from, switchMap } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import { DBCollections, Board } from "../models";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly db: AngularFirestore
  ) {}

  public getBoards(): void {
    this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.db
              .collection<Board>(DBCollections.Boards, ref => {
                return ref.where("uid", "==", user.uid).orderBy("priority");
              }).valueChanges({idField: "id"})
          }
          return [];
        })
      );
  }

  public createBoard(board: Board): void {
    from(this.afAuth.currentUser).pipe(
      switchMap(user => {
        return from(this.db.collection(DBCollections.Boards).add({
          ...board,
          uid: user?.uid,
          tasks: []
        }));
      }),
      untilDestroyed(this)
    ).subscribe()
  }

  public deleteBoard(boardId: string): void {
    from(
      this.db
        .collection(DBCollections.Boards)
        .doc(boardId)
        .delete()
    ).subscribe();
  }

  public updateTasks(boardId: string, tasks: Task[]): void {
    from(
      this.db
        .collection(DBCollections.Boards)
        .doc(boardId)
        .update({tasks})
    ).subscribe();
  }

  public removeTask(boardId: string, task: Task): void {
    from(
      this.db
        .collection(DBCollections.Boards)
        .doc(boardId)
        .update({
          tasks: firebase.firestore.FieldValue.arrayRemove(task)
        })
    ).subscribe()
  }
}
