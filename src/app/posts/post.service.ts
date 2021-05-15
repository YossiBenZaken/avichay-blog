import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Post, Tag } from './post';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>;
  tagsCollection: AngularFirestoreCollection<Tag>;
  constructor(private _store: AngularFirestore) {
    this.postsCollection = this._store.collection('posts', (ref) =>
      ref.orderBy('published', 'desc')
    );
    this.tagsCollection = this._store.collection('tags', (ref) =>
      ref.orderBy('tag', 'desc')
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
  getTags() {
    return this.tagsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Tag;
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
  createTag(data: Tag) {
    this.tagsCollection.add(data);
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
