import { Injectable } from "@angular/core";
import { Authentication } from "../models/auth.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@firebase/auth";

@Injectable()
export class GoogleAuthService implements Authentication {

  constructor(private readonly afAuth: AngularFireAuth) {}

  public isSignedIn$ = this.afAuth.authState;

  public signIn(): void {
    this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  public signOut(): void {
    this.afAuth.signOut();
  }
}
