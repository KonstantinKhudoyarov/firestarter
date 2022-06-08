import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SharedModule } from "../shared/shared.module";
import { Authentication} from "./models/auth.model";
import { GoogleAuthService } from "./services";
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    GoogleAuthComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: Authentication,
      useClass: GoogleAuthService
    }
  ]
})
export class UserModule { }
