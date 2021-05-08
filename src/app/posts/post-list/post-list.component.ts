import { AuthService } from './../../core/auth.service';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Post } from '../post';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;
  filteredPosts: Post[];
  filter: string;

  constructor(private _posts: PostService, public _auth: AuthService,private _title: Title) {
    this._title.setTitle('מכשפה צבאית')
   }

  ngOnInit(): void {
    this.posts = this._posts.getPosts();
    this.posts.subscribe(p => this.filteredPosts = p);
  }
  delete(id:string) {
    this._posts.delete(id);
  }
  filterPost() {
    if(this.filter != '') {
      this.posts.subscribe(p => this.filteredPosts = p.filter(po => po.title.includes(this.filter) || po.content.includes(this.filter)))
    } else {
      this.posts.subscribe(p => this.filteredPosts = p);
    }
  }
}
