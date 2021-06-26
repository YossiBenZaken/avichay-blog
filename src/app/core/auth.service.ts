import { MessagingService } from './messaging.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: any = null;
  user$: Observable<firebase.default.User>;
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((data) => (this.authState = data));
    this.user$ = this.afAuth.authState;
  }

  get autnticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.autnticated ? this.authState.uid : null;
  }

  login() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.default.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.signInWithPopup(provider).then((res) => {
        console.log(res);
        resolve(res);
      });
    });
  }
  logout() {
    this.afAuth.signOut();
  }
}
