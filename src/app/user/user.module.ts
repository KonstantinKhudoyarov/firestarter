import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { Authentication} from "./models/auth.model";
import { GoogleAuthService } from "./services";
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from "./components/sign-up-form/sign-up-form.component";
import { PasswordResetFormComponent } from "./components/password-reset-form/password-reset-form.component";

@NgModule({
  declarations: [
    LoginPageComponent,
    GoogleAuthComponent,
    LoginFormComponent,
    SignUpFormComponent,
    PasswordResetFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: Authentication,
      useClass: GoogleAuthService
    }
  ]
})
export class UserModule { }
