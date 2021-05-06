import { Observable } from 'rxjs';
import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css'],
})
export class PostDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  content: string;
  buttonText: string = 'צור פוסט';
  uploadPercent: Observable<number>;
  downloadURL: Promise<any>;
  constructor(
    private _auth: AuthService,
    private _posts: PostService,
    private _storage: AngularFireStorage
  ) {}

  ngOnInit(): void {}
  createPost() {
    const data: Post = {
      author: this._auth.authState.displayNAme || this._auth.authState.email,
      authorID: this._auth.currentUserId,
      content: this.content,
      title: this.title,
      image: this.image,
      published: new Date(),
    };
    this._posts.create(data);
    this.title = '';
    this.content = '';
    this.image = null;
    this.buttonText = 'פוסט נוצר!';
    setTimeout(() => (this.buttonText = 'צור פוסט'), 3000);
  }
  uploadImage(e) {
    const file = e.target.files[0];
    const path = `posts/${file.name}`;
    if(file.type.split('/')[0] !== 'image') {
      return alert('רק תמונות')
    } else {
      const task = this._storage.upload(path,file);
      task.then(a => a.ref.getDownloadURL().then(url => this.image = url));
      this.uploadPercent = task.percentageChanges();
    }
  }
}
