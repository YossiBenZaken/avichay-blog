import { MessagingService } from './messaging.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: any = null;
  user$: Observable<firebase.default.User>;
  constructor(public afAuth: AngularFireAuth, private _router: Router) {
    this.afAuth.authState.subscribe((data) => (this.authState = data));
    this.user$ = this.afAuth.authState;
  }

  get autnticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.autnticated ? this.authState.uid : null;
  }

  loginWithGoogle() {
    return new Promise<firebase.default.auth.UserCredential>(
      (resolve, reject) => {
        const provider = new firebase.default.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.afAuth.signInWithPopup(provider).then((res) => {
          console.log(res);
          resolve(res);
          this._router.navigate(['/']);
        });
      }
    );
  }
  loginWithFacebook() {
    return new Promise<firebase.default.auth.UserCredential>(
      (resolve, reject) => {
        const provider = new firebase.default.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        provider.addScope('email');
        provider.setCustomParameters({
          display: 'popup',
        });
        this.afAuth
          .signInWithPopup(provider)
          .then((res) => {
            console.log(res);
            resolve(res);
            this._router.navigate(['/']);
          })
          .catch((err) => {
            if (err.code === 'auth/account-exists-with-different-credential') {
              let pendingCred = err.credential;
              let email = err.email;
              this.afAuth.fetchSignInMethodsForEmail(email).then((methods) => {
                if (methods[0] === 'password') {
                  let password = prompt('Enter password of email');
                  this.afAuth
                    .signInWithEmailAndPassword(email, password)
                    .then((result) => {
                      return result.user.linkWithCredential(pendingCred);
                    })
                    .then((user) => {
                      resolve(user);
                      this._router.navigate(['/']);
                    });
                }
                let provider = new firebase.default.auth.GoogleAuthProvider();
                this.afAuth.signInWithPopup(provider).then((result) => {
                  result.user.linkWithCredential(pendingCred).then((user) => {
                    resolve(user);
                    this._router.navigate(['/']);
                  });
                });
              });
            }
          });
      }
    );
  }
  login(body: any) {
    return new Promise<firebase.default.auth.UserCredential>(
      (resolve, reject) => {
        this.afAuth
          .signInWithEmailAndPassword(body.email, body.password)
          .then((res) => {
            resolve(res);
            this._router.navigate(['/']);
          });
      }
    );
  }
  signUp(body: any) {
    return new Promise<firebase.default.auth.UserCredential>(
      (resolve, reject) => {
        this.afAuth
          .createUserWithEmailAndPassword(body.email, body.password)
          .then((res) => {
            var user = firebase.default.auth().currentUser;
            user
              .updateProfile({
                displayName: body.displayName,
              })
              .then(() => {
                resolve(res);
              });
            this._router.navigate(['/']);
          });
      }
    );
  }
  logout() {
    this.afAuth.signOut();
  }
}
