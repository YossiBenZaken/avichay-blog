import { AuthService } from './../../core/auth.service';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Post } from '../post';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;
  constructor(private _posts: PostService, public _auth: AuthService) { }

  ngOnInit(): void {
    this.posts = this._posts.getPosts();
  }
  delete(id:string) {
    this._posts.delete(id);
  }
}
