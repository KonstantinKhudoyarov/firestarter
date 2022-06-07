import { Component } from '@angular/core';
import { Authentication } from "../models/auth.model";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(public readonly auth: Authentication) {}
}
