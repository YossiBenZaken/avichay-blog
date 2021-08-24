import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  psw: string;
  provider: boolean = false;
  constructor(private _auth: AuthService) {}
  ngOnInit(): void {
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
}
