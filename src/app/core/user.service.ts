import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _http = inject(HttpClient);
  userUrl: string = `${environment.serverUrl}/api/tags`;
  save(user: User) {
    return this._http.post(this.userUrl, {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    });
  }
  get(uid: string) {
    return this._http.get(`${this.userUrl}/${uid}`);
  }
}
