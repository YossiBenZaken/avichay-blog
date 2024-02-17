import { Component, OnInit, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    standalone: true,
    imports: [
        MatCardModule,
        NgIf,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
})
export class EditProfileComponent implements OnInit {
  psw: string;
  displayName: string;
  provider: boolean = false;
  user: User;

  private _auth = inject(AuthService);
  
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
