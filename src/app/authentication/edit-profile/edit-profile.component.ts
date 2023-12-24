import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { User } from '@angular/fire/auth';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  psw: string;
  displayName: string;
  provider: boolean = false;
  user: User;
  constructor(private _auth: AuthService) {}
  ngOnInit(): void {
    this.user = this._auth.authState;
    this.displayName = this.user.displayName;
    setTimeout(() => {
      this.provider =
        this._auth.providers.filter((e) => e.providerId === 'password')
          .length === 1;
    }, 1500);
  }
  updatePassword(form: NgForm) {
    if (
      this._auth.providers.filter((e) => e.providerId === 'password').length ===
      1
    ) {
      this._auth.changePassword(form.value.password);
    }
  }
  updateProfile(form: NgForm) {
    const body = {
      name: form.value.name,
      photo: this._auth.authState.photoURL,
    };
    this._auth.updateProfile(body);
  }
}
