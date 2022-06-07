import { Observable } from "rxjs";

export abstract class Authentication {
  public abstract isSignedIn$: Observable<unknown>
  public abstract signIn(): void
  public abstract signOut(): void;
}
