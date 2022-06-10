import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
    ) {}

  public authError(): void {
    this.snackBar.open("You must be logged in!", "OK", {
      duration: 5000
    });

    this.snackBar._openedSnackBarRef?.onAction()
      .pipe(
        tap(() => {
          this.router.navigate(["/login"]);
        })
      )
      .subscribe();
  }
}
