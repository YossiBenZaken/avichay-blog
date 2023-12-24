import { Injectable } from '@angular/core';
import { Firestore, setDoc,doc, getDoc } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _store: Firestore) {}
  async save(user: User) {
    await setDoc(doc(this._store, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    })
  }
  async get(uid: string) {
    const docRef = doc(this._store, `users/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('document not found');
    }
  }
}
