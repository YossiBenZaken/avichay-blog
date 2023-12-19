import { ProductService } from './../../store/product.service';
import { Observable } from 'rxjs';
import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';
import { Post } from '../post';
import { AngularFireStorage } from '@angular/fire/storage';
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
  uploadPercent: Observable<number>;
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
    private _storage: AngularFireStorage,
    private _title: Title,
    private _product: ProductService
  ) {
    this._title.setTitle('מכשפת יער - פאנל ניהול');
    this._posts
      .getTags()
      .subscribe(
        (tags) => (this.tagsItems = tags.map((a: any) => (a = a.tag)))
      );
  }
  createPost() {
    this._auth.user$.subscribe((user) => {
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
      this._posts.create(data);
      this.title = '';
      this.content = '';
      this.image = null;
      this.tags = [];
      this.buttonText = 'פוסט נוצר!';
      setTimeout(() => (this.buttonText = 'צור פוסט'), 3000);
    });
  }
  uploadImage(e) {
    const file = e.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('רק תמונות');
    } else {
      const task = this._storage.upload(path, file);
      task.then((a) =>
        a.ref.getDownloadURL().then((url) => (this.image = url))
      );
      this.uploadPercent = task.percentageChanges();
    }
  }
  uploadImageTemp(e) {
    const file = e.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('רק תמונות');
    } else {
      const task = this._storage.upload(path, file);
      task.then((a) =>
        a.ref.getDownloadURL().then((url) => (this.uploadTempImage = url))
      );
      this.uploadTempPercent = task.percentageChanges();
    }
  }
  copy() {
    let copyText: any = document.getElementById('imageString');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }
  delete() {
    if (!confirm('האם אתה בטוח שאתה רוצה למחוק את המוצר הזה?')) {
      return;
    }
    this._product.delete(this.id);
  }
  onCustomItemCreating(args) {
    let newValue = args.text;
    this._posts.createTag({ tag: newValue });
    args.customItem = newValue;
  }
}
