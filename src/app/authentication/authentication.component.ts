import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
    standalone: true,
    imports: [
        MatCardModule,
        FormsModule,
        NgIf,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
})
export class AuthenticationComponent implements OnInit {
  loginMode: boolean = true;
  email: string;
  psw: string;
  fullName: string;

  private _auth = inject(AuthService);

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
