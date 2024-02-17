import { Injectable, inject } from '@angular/core';
import {
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: User = null;

  public _auth = inject(Auth);
  private _router = inject(Router);

  constructor() {
    this._auth.onAuthStateChanged((user) => {
      this.authState = user;
    });
  }

  get providers() {
    return this.authState.providerData;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  loginWithGoogle() {
    return new Promise<UserCredential>((resolve, reject) => {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      signInWithPopup(this._auth, provider).then((res) => {
        resolve(res);
        this._router.navigate(['/']);
      });
    });
  }
  loginWithFacebook() {
    return new Promise<UserCredential>((resolve, reject) => {
      const provider = new FacebookAuthProvider();
      provider.addScope('public_profile');
      provider.addScope('email');
      provider.setCustomParameters({
        display: 'popup',
      });
      signInWithPopup(this._auth, provider)
        .then((res) => {
          console.log(res);
          resolve(res);
          this._router.navigate(['/']);
        })
        .catch((err) => {
          if (err.code === 'auth/account-exists-with-different-credential') {
            let pendingCred = err.credential;
            let email = err.email;
            fetchSignInMethodsForEmail(this._auth, email).then((methods) => {
              if (methods[0] === 'password') {
                let password = prompt('Enter password of email');
                signInWithEmailAndPassword(this._auth, email, password)
                  .then((result) => {
                    return linkWithCredential(result.user, pendingCred);
                  })
                  .then((user) => {
                    resolve(user);
                    this._router.navigate(['/']);
                  });
              }
              let provider = new GoogleAuthProvider();
              signInWithPopup(this._auth, provider).then((result) => {
                linkWithCredential(result.user, pendingCred).then((user) => {
                  resolve(user);
                  this._router.navigate(['/']);
                });
              });
            });
          }
        });
    });
  }
  login(body: any) {
    return new Promise<UserCredential>((resolve, reject) => {
      signInWithEmailAndPassword(this._auth, body.email, body.password).then(
        (res) => {
          resolve(res);
          this._router.navigate(['/']);
        }
      );
    });
  }
  signUp(body: any) {
    return new Promise<UserCredential>((resolve, reject) => {
      createUserWithEmailAndPassword(
        this._auth,
        body.email,
        body.password
      ).then((res) => {
        updateProfile(this.authState, {
          displayName: body.displayName
        }).then(() => {
          resolve(res);
        });
        this._router.navigate(['/']);
      });
    });
  }
  logout() {
    this._auth.signOut();
    this._router.navigate(['/login']);
  }
  changePassword(password: string) {
    this._auth.onAuthStateChanged((user) => {
      updatePassword(user, password).then((value) => {
        console.log(value);
        this.logout();
        this._router.navigate(['/login']);
      });
    });
  }
  updateProfile(body: { name: string; photo: string }) {
    this._auth.onAuthStateChanged((user) => {
      updateProfile(user, {
        displayName: body.name,
        photoURL: body.photo,
      }).then(() => {
        console.log(user);
      });
    });
  }
}
