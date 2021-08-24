import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userCollection: AngularFirestoreCollection<any>;
  constructor(private _store: AngularFirestore) {
    this.userCollection = this._store.collection('users');
  }
  save(user: firebase.default.User) {
    this.userCollection.doc(user.uid).set({
      name: user.displayName,
      email: user.email,
    });
  }
  get(uid: string) {
    return this._store.doc(`users/${uid}`);
  }
}
