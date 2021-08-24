import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  optionDoc: AngularFirestoreDocument<any>;
  constructor(private _store: AngularFirestore) {
    this.optionDoc = this._store
      .collection('options')
      .doc('bCFJabzirrkGcdJcCi1k');
  }
  getBackgrounds() {
    return this.optionDoc
      .snapshotChanges()
      .pipe(map((a) => a.payload.data().background));
  }
  saveBackground(arr) {
    this.optionDoc.update(arr);
  }
}
