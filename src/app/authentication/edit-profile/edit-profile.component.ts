import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  psw: string;
  constructor(private _auth: AuthService) {}
  updatePassword(form: NgForm) {
    // this._auth.changePassword();
    console.log(form.value);
  }
}
