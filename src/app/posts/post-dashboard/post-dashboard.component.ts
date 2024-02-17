import { Observable } from 'rxjs';
import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { Post } from '../post';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Title } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DxoToolbarModule, DxiItemModule, DxoMediaResizingModule } from 'devextreme-angular/ui/nested';
import { DxTagBoxModule, DxHtmlEditorModule, DxPopupModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardNavComponent } from '../dashboard-nav/dashboard-nav.component';
@Component({
    selector: 'app-post-dashboard',
    templateUrl: './post-dashboard.component.html',
    styleUrls: ['./post-dashboard.component.css'],
    standalone: true,
    imports: [
        DashboardNavComponent,
        MatGridListModule,
        MatCardModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        DxTagBoxModule,
        DxHtmlEditorModule,
        DxoToolbarModule,
        DxiItemModule,
        DxoMediaResizingModule,
        MatButtonModule,
        DxPopupModule,
        MatIconModule,
        AsyncPipe,
    ],
})
export class PostDashboardComponent implements OnInit {
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

  private _auth = inject(AuthService);
  private _posts = inject(PostService);
  private _storage = inject(Storage);
  private _title = inject(Title);

  ngOnInit(): void {
    this._title.setTitle('מכשפת יער - פאנל ניהול');
    this._posts
      .getTags()
      .subscribe((tags) => {
      this.tagsItems = tags.map((a: any) => (a = a.tag))
      });
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
    this._posts.create(data).subscribe();
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
    this._posts.createTag({ tag: newValue }).subscribe();
    args.customItem = newValue;
  }
}
