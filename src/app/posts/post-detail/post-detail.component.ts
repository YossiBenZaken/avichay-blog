import { AuthService } from './../../core/auth.service';
import { PostService } from './../post.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostDetailComponent implements OnInit {
  post: Post;
  editing: boolean = false
  constructor(private _route: ActivatedRoute, private _posts: PostService,public _auth: AuthService,private _router: Router) {}

  ngOnInit(): void {
    this.getPost();
  }
  getPost() {
    const id = this._route.snapshot.paramMap.get('id');
    this._posts
      .getPostData(id).ref.get().then(doc => {
        if(doc.exists) {
          this.post = doc.data();
        }
      });
  }
  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content
    }
    const id = this._route.snapshot.paramMap.get('id')
    this._posts.update(id, formData)
    this.editing = false
  }

  delete() {
    const id = this._route.snapshot.paramMap.get('id')
    this._posts.delete(id)
    this._router.navigate(['/blog'])
  }


}
