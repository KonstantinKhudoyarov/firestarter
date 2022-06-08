import { Component } from '@angular/core';
import { Authentication } from "../../models/auth.model";

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent {

  constructor(public readonly auth: Authentication) { }
}
