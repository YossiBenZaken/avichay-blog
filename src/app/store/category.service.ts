import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  catCollection: AngularFirestoreCollection<any>;
  constructor(private _store: AngularFirestore) {
    this.catCollection = this._store.collection('categories');
  }
  getAll() {
    return this.catCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
}
