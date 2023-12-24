import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  DocumentSnapshot,
  Firestore,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _store: Firestore = inject(Firestore);
  optionDoc: DocumentSnapshot<DocumentData, DocumentData>;
  async assignDoc() {
    return await getDoc(
      doc(this._store, 'options', 'bCFJabzirrkGcdJcCi1k')
    );
  }
  async getBackgrounds() {
    const backgroundRef = await getDoc(
      doc(this._store, 'options', 'bCFJabzirrkGcdJcCi1k')
    );
    return backgroundRef.data().background;
  }
  async saveBackground(arr) {
    await updateDoc(doc(this._store, 'options', 'bCFJabzirrkGcdJcCi1k'), arr);
  }
}
