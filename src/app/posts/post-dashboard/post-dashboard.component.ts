import { Observable } from 'rxjs';
import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';
import { Post } from '../post';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css'],
})
export class PostDashboardComponent {
  title: string;
  image: string = null;
  content: string;
  tags: string[] = [];
  tagsItems: string[];
  buttonText: string = 'צור פוסט';
  uploadPercent: number;
  uploadTempPercent: Observable<number>;
  downloadURL: Promise<any>;
  id;
  uploadImagePopUp: boolean;
  toolbarButtonOptions: any = {
    text: 'העלה תמונה',
    stylingMode: 'text',
    onClick: () => (this.uploadImagePopUp = true),
  };
  uploadTempImage: string = null;
  constructor(
    private _auth: AuthService,
    private _posts: PostService,
    private _storage: Storage,
    private _title: Title,
  ) {
    this._title.setTitle('מכשפת יער - פאנל ניהול');
    this._posts
      .getTags()
      .then((tags) => (this.tagsItems = tags.map((a: any) => (a = a.tag))));
  }
  async createPost() {
    const user = this._auth.authState;
    const data: Post = {
      author: user.displayName || user.email,
      authorID: user.uid,
      content: this.content,
      title: this.title,
      image: this.image,
      published: new Date(),
      comments: [],
      views: 0,
      tags: this.tags,
      draft: true,
    };
    await this._posts.create(data);
    this.title = '';
    this.content = '';
    this.image = null;
    this.tags = [];
    this.buttonText = 'פוסט נוצר!';
    setTimeout(() => (this.buttonText = 'צור פוסט'), 3000);
  }
  uploadImage(e) {
    const file = e.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('רק תמונות');
    } else {
      const storageRef = ref(this._storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadPercent = progress;
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadUrl) => (this.image = downloadUrl)
          );
        }
      );
    }
  }
  uploadImageTemp(e) {
    const file = e.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('רק תמונות');
    } else {
      const storageRef = ref(this._storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadPercent = progress;
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadUrl) => (this.uploadTempImage = downloadUrl)
          );
        }
      );
    }
  }
  copy() {
    let copyText: any = document.getElementById('imageString');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }
  async onCustomItemCreating(args) {
    let newValue = args.text;
    await this._posts.createTag({ tag: newValue });
    args.customItem = newValue;
  }
}
