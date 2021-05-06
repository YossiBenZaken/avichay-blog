import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Post } from './post';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>;
  constructor(private _store: AngularFirestore) {
    this.postsCollection = this._store.collection('posts', (ref) =>
      ref.orderBy('published', 'desc')
    );
  }
  getPosts(): Observable<Post[]> {
    return this.postsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
  getPostData(id: string): AngularFirestoreDocument<Post> {
    return this._store.collection('posts').doc<Post>(id);
  }
  getPost(id: string): AngularFirestoreDocument<Post> {
    return this._store.doc<Post>(`posts/${id}`);
  }
  create(data: Post) {
    this.postsCollection.add(data);
  }
  delete(id: string) {
    return this.getPost(id).delete();
  }
  update(id: string, formData) {
    return this.getPost(id).update(formData);
  }
}
