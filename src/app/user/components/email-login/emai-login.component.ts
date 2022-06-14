import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormType } from "../../models/login.types";

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent {

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {
    this.form = this.initForm();
  }

  public form: FormGroup;
  public serverMessage: unknown;
  public isLoading = false;

  private formType: FormType = 'signup';

  public initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ],
      passwordConfirm: ['', []]
    });
  }

  public changeType(val: FormType): void {
    this.formType = val;
  }

  public get isLogin(): boolean {
    return this.formType === 'login';
  }

  public get isSignup(): boolean {
    return this.formType === 'signup';
  }

  public get isPasswordReset(): boolean {
    return this.formType === 'reset';
  }

  public get email(): AbstractControl | null {
    return this.form.get('email');
  }

  public get password(): AbstractControl | null {
    return this.form.get('password');
  }

  public get passwordConfirm(): AbstractControl | null {
    return this.form.get('passwordConfirm');
  }

  public get passwordDoesMatch(): boolean {
    if (this.formType !== 'signup') {
      return true;
    } else {
      return this.password?.value === this.passwordConfirm?.value;
    }
  }

  public async onSubmit() {
    this.isLoading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
    } catch (err: unknown) {
      this.serverMessage = err;
    }

    this.isLoading = false;
  }
}
