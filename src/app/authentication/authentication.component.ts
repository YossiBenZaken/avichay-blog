import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  loginMode: boolean = true;
  email: string;
  psw: string;
  fullName: string;
  constructor(private _auth: AuthService) {}

  ngOnInit() {}
  switchMode() {
    this.loginMode = !this.loginMode;
  }
  loginWithGoogle() {
    this._auth.loginWithGoogle();
  }
  loginWithFacebook() {
    this._auth.loginWithFacebook();
  }
  login() {
    let body = {
      email: this.email,
      password: this.psw,
    };
    this._auth.login(body);
  }
  signUp() {
    let body = {
      email: this.email,
      password: this.psw,
      displayName: this.fullName,
    };
    this._auth.signUp(body);
  }
}
