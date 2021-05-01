import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post;
  constructor(private _route: ActivatedRoute, private _posts: PostService) {}

  ngOnInit(): void {
    this.getPost();
  }
  getPost() {
    const id = this._route.snapshot.paramMap.get('id');
    this._posts
      .getPostData(id).ref.get().then(doc => {
        if(doc.exists) {
          console.log(doc.data());
          this.post = doc.data();
        }
      });
  }
}
