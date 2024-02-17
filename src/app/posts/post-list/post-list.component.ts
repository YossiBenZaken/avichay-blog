import { AuthService } from './../../core/auth.service';
import { PostService } from './../post.service';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxoPositionModule } from 'devextreme-angular/ui/nested';
import { DxPopupModule, DxScrollViewModule } from 'devextreme-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor, DatePipe, CommonModule } from '@angular/common';
@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    animations: [
        trigger('changePage', [
            state('active', style({
                backgroundColor: '#00e676',
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '50%',
                cursor: 'pointer',
            })),
            state('notActive', style({
                backgroundColor: 'transparent',
                fontWeight: 'normal',
                cursor: 'pointer',
            })),
            transition('active <=> notActive', [animate('0.3s')]),
        ]),
    ],
    standalone: true,
    imports: [
        NgIf,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        CommonModule,
        FormsModule,
        NgFor,
        MatCardModule,
        RouterLink,
        MatBadgeModule,
        MatButtonModule,
        DxPopupModule,
        DxoPositionModule,
        DxTemplateModule,
        DxScrollViewModule,
        DatePipe,
    ],
})
export class PostListComponent implements OnInit {
  posts: Post[];
  filteredPosts: Post[];
  filter: string;
  pagination: boolean;
  page: number;
  numOfPages: number;
  popupVisible: boolean = false;
  postPopup: Post;

  private _posts = inject(PostService);
  private _title = inject(Title);
  public _auth = inject(AuthService);

  async ngOnInit() {
    this._title.setTitle('מכשפת יער');
    this.page = 1;
    this.pagination = true;
    await this._posts.getPosts().subscribe((posts) => {
      this.posts = posts;
      if (
        !this._auth.authenticated ||
        (this._auth.currentUserId != '2cXuXRRfYaaItvmuNZESMJUtpCb2' &&
          this._auth.currentUserId != 'b8txRyLkBNZ1jQsiCkKtKO7nD6o2')
      ) {
        this.posts = this.posts.filter((post) => !post.draft);
      }
      this.filteredPosts = this.posts.slice(
        this.page ? (this.page - 1) * 10 : 0,
        this.page * 10 || 10
      );
      this.numOfPages = Math.floor(this.posts.length / 10);
      if (this.posts.length % 10 != 0) {
        this.numOfPages += 1;
      }
    });
  }
  delete(id: string) {
    this._posts.delete(id).subscribe();
  }
  async visible(id: string, draft: boolean) {
    const data = {
      draft: !draft,
    };
    this._posts.update(id, data).subscribe();
  }
  filterPost() {
    if (this.filter != '') {
      this.pagination = false;
      this.filteredPosts = this.posts
        .filter(
          (po) =>
            po.title.includes(this.filter) ||
            po.content.includes(this.filter) ||
            (po.tags && po.tags.includes(this.filter))
        );
    } else {
      this.pagination = true;
      if (
        !this._auth.authenticated ||
        (this._auth.currentUserId != '2cXuXRRfYaaItvmuNZESMJUtpCb2' &&
          this._auth.currentUserId != 'b8txRyLkBNZ1jQsiCkKtKO7nD6o2')
      ) {
        this.posts = this.posts.filter((post) => !post.draft);
      }
      this.filteredPosts = this.posts;
    }
  }
  changePage(page) {
    if (page > this.numOfPages) return;
    if (page < 1) return;
    this.page = page;
    this.filteredPosts = this.posts
      .slice(this.page ? (this.page - 1) * 10 : 0, this.page * 10 || 10);
  }
  showComments(post: Post) {
    this.popupVisible = true;
    this.postPopup = post;
  }
}
