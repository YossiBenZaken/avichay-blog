import { AuthService } from './../../core/auth.service';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations: [
    trigger('changePage', [
      state(
        'active',
        style({
          backgroundColor: '#00e676',
          color: 'black',
          fontWeight: 'bold',
          borderRadius: '50%',
          cursor: 'pointer',
        })
      ),
      state(
        'notActive',
        style({
          backgroundColor: 'transparent',
          fontWeight: 'normal',
          cursor: 'pointer',
        })
      ),
      transition('active <=> notActive', [animate('0.3s')]),
    ]),
  ],
})
export class PostListComponent implements OnInit {
  posts: QueryDocumentSnapshot<Post, DocumentData>[];
  filteredPosts: Post[];
  filter: string;
  pagination: boolean;
  page: number;
  numOfPages: number;
  popupVisible: boolean = false;
  postPopup: Post;
  constructor(
    private _posts: PostService,
    public _auth: AuthService,
    private _title: Title
  ) {
    this._title.setTitle('מכשפת יער');
  }

  async ngOnInit() {
    this.page = 1;
    this.pagination = true;
    this.posts = await this._posts.getPosts();
    console.log(`Found ${this.posts.length} posts`);
    if (
      !this._auth.authenticated ||
      (this._auth.currentUserId != '2cXuXRRfYaaItvmuNZESMJUtpCb2' &&
        this._auth.currentUserId != 'b8txRyLkBNZ1jQsiCkKtKO7nD6o2')
    ) {
      this.posts = this.posts.filter((post) => post.data().draft == false);
    }
    this.filteredPosts = this.posts
      .slice(this.page ? (this.page - 1) * 10 : 0, this.page * 10 || 10)
      .map((post) => ({ id: post.id, ...post.data() }));
    this.numOfPages = Math.floor(this.posts.length / 10);
    if (this.posts.length % 10 != 0) {
      this.numOfPages += 1;
    }
  }
  async delete(id: string) {
    await this._posts.delete(id);
  }
  async visible(id: string, draft: boolean) {
    const data = {
      draft: !draft,
    };
    await this._posts.update(id, data);
  }
  filterPost() {
    if (this.filter != '') {
      this.pagination = false;
      this.filteredPosts = this.posts
        .filter(
          (po) =>
            po.data().title.includes(this.filter) ||
            po.data().content.includes(this.filter) ||
            (po.data().tags && po.data().tags.includes(this.filter))
        )
        .map((post) => ({ id: post.id, ...post.data() }));
    } else {
      this.pagination = true;
      if (
        !this._auth.authenticated ||
        (this._auth.currentUserId != '2cXuXRRfYaaItvmuNZESMJUtpCb2' &&
          this._auth.currentUserId != 'b8txRyLkBNZ1jQsiCkKtKO7nD6o2')
      ) {
        this.posts = this.posts.filter((post) => post.data().draft == false);
      }
      this.filteredPosts = this.posts.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
    }
  }
  changePage(page) {
    if (page > this.numOfPages) return;
    if (page < 1) return;
    this.page = page;
    this.filteredPosts = this.posts
      .slice(this.page ? (this.page - 1) * 10 : 0, this.page * 10 || 10)
      .map((post) => ({ id: post.id, ...post.data() }));
  }
  showComments(post: Post) {
    this.popupVisible = true;
    this.postPopup = post;
  }
}
