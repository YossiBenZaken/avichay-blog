import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  content: string;
  buttonText: string = 'Create Post';
  constructor(private _auth: AuthService,private _posts: PostService) { }

  ngOnInit(): void {
  }
  createPost() {
    const data:Post = {
      author: this._auth.authState.displayNAme || this._auth.authState.email,
      authorID: this._auth.currentUserId,
      content: this.content,
      title: this.title,
      image: this.image,
      published: new Date()
    }
    this._posts.create(data);
    this.title = '';
    this.content = '';
    this.image = null;
    this.buttonText = "Post Created!";
    setTimeout(() => this.buttonText = "Create Post",3000);
  }
}
