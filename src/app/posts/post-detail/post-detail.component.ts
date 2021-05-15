import { AuthService } from './../../core/auth.service';
import { PostService } from './../post.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, Comment } from '../post';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {
  post: Post;
  editing: boolean = false;
  comment: Comment = new Comment();
  constructor(
    private _route: ActivatedRoute,
    private _posts: PostService,
    public _auth: AuthService,
    private _router: Router,
    private _title: Title,
    private _meta: Meta
  ) {}

  async ngOnInit() {
    await this.getPost();

  }
  getPost() {
    const id = this._route.snapshot.paramMap.get('id');
    this._posts
      .getPostData(id)
      .ref.get()
      .then((doc) => {
        if (doc.exists) {
          this.post = doc.data();
          this._title.setTitle('מכשפה צבאית - ' + this.post.title);
          this._meta.updateTag({
            property: 'og:title',
            content: this.post.title,
          });
          this._meta.updateTag({
            property: 'og:description',
            content: this.post.content.substr(0, 100),
          });
          if (this.post.image) {
            this._meta.updateTag({
              property: 'og:image',
              content: this.post.image,
            });
          }
          
        }
      }).then(()=>{
        setTimeout(() => {
          var span = document.getElementsByTagName('span');
              Array.prototype.forEach.call(span, function (el) {
                el.innerHTML = el.innerHTML.replace(/&nbsp;/gi, ' ');
              });
        },0);
      });
  }
  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
    };
    const id = this._route.snapshot.paramMap.get('id');
    this._posts.update(id, formData);
    this.editing = false;
  }
  updateComment() {
    if (!this.post.comments) {
      this.post.comments = [];
    }
    let c = Object.assign({}, this.comment);
    this.post.comments.push(c);
    const comment = this.post.comments.map((obj) => Object.assign({}, obj));
    const formData = {
      comments: comment,
    };
    const id = this._route.snapshot.paramMap.get('id');
    this._posts.update(id, formData);
    this.comment.content = '';
    this.comment.name = '';
  }
  deleteComment(index: number) {
    this.post.comments.splice(index, 1);
    const comment = this.post.comments.map((obj) => Object.assign({}, obj));
    const formData = {
      comments: comment,
    };
    const id = this._route.snapshot.paramMap.get('id');
    this._posts.update(id, formData);
  }
  delete() {
    const id = this._route.snapshot.paramMap.get('id');
    this._posts.delete(id);
    this._router.navigate(['/blog']);
  }

  share(company) {
    if (company === 'facebook') {
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href,
        '_blank'
      );
    } else if (company === 'twitter') {
      window.open(
        'https://twitter.com/intent/tweet?text=' + window.location.href,
        '_blank'
      );
    } else if (company === 'whatsapp') {
      window.open(
        'https://web.whatsapp.com/send?text=' + window.location.href,
        '_blank'
      );
    }
  }
}
