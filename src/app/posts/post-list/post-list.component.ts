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
  posts: Observable<Post[]>;
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
    private _title: Title,
    private _route: ActivatedRoute
  ) {
    this._title.setTitle('מכשפה צבאית');
  }

  ngOnInit(): void {
    this.page = 1;
    this.pagination = true;
    this.posts = this._posts.getPosts();
    this.posts.subscribe((p) => {
      this.filteredPosts = p.slice(
        this.page ? (this.page - 1) * 10 : 0,
        this.page * 10 || 10
      );
      this.numOfPages = Math.floor(p.length / 10);
      if (p.length % 10 != 0) {
        this.numOfPages += 1;
      }
    });
  }
  delete(id: string) {
    this._posts.delete(id);
  }
  filterPost() {
    if (this.filter != '') {
      this.pagination = false;
      this.posts.subscribe(
        (p) =>
          (this.filteredPosts = p.filter(
            (po) =>
              po.title.includes(this.filter) ||
              po.content.includes(this.filter) ||
              (po.tags && po.tags.includes(this.filter))
          ))
      );
    } else {
      this.pagination = true;
      this.posts.subscribe((p) => (this.filteredPosts = p));
    }
  }
  changePage(page) {
    if (page > this.numOfPages) return;
    if (page < 1) return;
    this.page = page;
    this.posts.subscribe((p) => {
      this.filteredPosts = p.slice(
        this.page ? (this.page - 1) * 10 : 0,
        this.page * 10 || 10
      );
    });
  }
  showComments(post: Post) {
    this.popupVisible = true;
    this.postPopup = post;
  }
}
