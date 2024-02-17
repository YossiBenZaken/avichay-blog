import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/core/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [NgIf, MatCardModule, MatButtonModule, RouterLink],
})
export class ProfileComponent implements OnInit {
  user: { name: string; photo: string; email: string };
  id: string;

  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _user: UserService = inject(UserService);
  private _auth: AuthService = inject(AuthService);

  ngOnInit() {
    this._route.params.subscribe((param) => {
      this.id = param.id;
      this._user
        .get(param.id)
        .subscribe((res: { name: string; photo: string; email: string }) => {
          this.user = res;
        });
    });
  }
  get currentUser() {
    return this.id === this._auth.currentUserId;
  }
}
