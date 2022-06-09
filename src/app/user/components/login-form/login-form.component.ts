import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(private readonly fb: FormBuilder) {
    this.form = this.initForm();
  }

  public isLoading = false;
  public serverMessage = "";
  public form: FormGroup;

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
    return this.password?.value === this.passwordConfirm?.value;
  }

  public get isButtonDisabled(): boolean {
    return this.form.invalid || !this.passwordDoesMatch || this.isLoading
  }

  private initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []]
    });
  }
}
