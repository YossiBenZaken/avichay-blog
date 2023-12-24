import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  Query,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { Post, Tag } from './post';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _store: Firestore = inject(Firestore);
  postsQuery: Query<Post>;
  tagsQuery: Query<Tag>;
  postCollection: CollectionReference<Post, DocumentData>;
  tagCollection: CollectionReference<Tag, DocumentData>;
  constructor() {
    this.postCollection = collection(
      this._store,
      'posts'
    ) as CollectionReference<Post, DocumentData>;
    this.tagCollection = collection(this._store, 'tags') as CollectionReference<
      Tag,
      DocumentData
    >;
    this.postsQuery = query(this.postCollection, orderBy('published', 'desc'));
    this.tagsQuery = query(this.tagCollection, orderBy('tag', 'desc'));
  }
  async getPosts() {
    return (await getDocs(this.postsQuery)).docs;
  }
  async getTags() {
    return (await getDocs(this.tagsQuery)).docs;
  }
  async getPostData(id: string): Promise<Post> {
    const postRef = doc(this._store, 'posts', id) as DocumentReference<Post>;
    return (await getDoc<Post, DocumentData>(postRef)).data();
  }
  async getPost(id: string) {
    return doc(this._store, 'posts', id) as DocumentReference<Post>;
  }
  async createTag(data: Tag) {
    await addDoc(this.tagCollection, data);
  }
  async create(data: Post) {
    await addDoc(this.postCollection, data);
  }
  async delete(id: string) {
    return await deleteDoc(await this.getPost(id));
  }
  async update(id: string, formData) {
    return await updateDoc(await this.getPost(id), formData);
  }
}
