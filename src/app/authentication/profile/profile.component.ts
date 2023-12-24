import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/core/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: { name: string; photo: string; email: string };
  id: string;
  constructor(
    private _route: ActivatedRoute,
    private _user: UserService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((param) => {
      this.id = param.id;
      this._user.get(param.id).then(res => {
        this.user = res.data();
      })
    });
  }
  get currentUser() {
    return this.id === this._auth.currentUserId;
  }
}
