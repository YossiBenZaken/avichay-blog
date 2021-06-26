import { Observable, Subscription } from 'rxjs';
import { AuthService } from './../../core/auth.service';
import { PostService } from './../post.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  AfterContentChecked,
  ChangeDetectorRef,
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
export class PostDetailComponent implements OnInit, AfterViewInit {
  post: Post;
  editing: boolean = false;
  comment: Comment = new Comment();
  tags: string[];
  tagsItems: string[];
  prePost: Post;
  nextPost: Post;
  posts: Subscription;
  routeId: string;
  constructor(
    private _route: ActivatedRoute,
    private _posts: PostService,
    public _auth: AuthService,
    private _router: Router,
    private _title: Title,
    private _meta: Meta,
    private _cd: ChangeDetectorRef
  ) {
    this.routeId = this._route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this._posts
      .getTags()
      .subscribe(
        (tags) => (this.tagsItems = tags.map((a: any) => (a = a.tag)))
      );
    await this.getPost();
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngAfterViewInit() {
    this._route.paramMap.subscribe(async (param) => {
      const id = param.get('id');
      this.posts = this._posts.getPosts().subscribe((p) => {
        let posts = p;
        const lengthOfPosts = p.length;
        const thisPost = posts.filter((pf) => pf.id === id)[0];
        const indexOfThisPost = posts.findIndex((p) => p == thisPost);
        if (indexOfThisPost > 0) {
          this.nextPost = p[indexOfThisPost - 1];
        }
        if (indexOfThisPost < lengthOfPosts) {
          this.prePost = p[indexOfThisPost + 1];
        }
      });
    });
  }
  getPost() {
    const id = this._route.snapshot.paramMap.get('id');
    this._posts
      .getPostData(id)
      .ref.get()
      .then((doc) => {
        if (doc.exists) {
          this.post = doc.data();
          if (this.post.views) {
            this.post.views += 1;
          } else {
            this.post.views = 1;
          }
          this._posts.update(id, this.post);
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
      })
      .then(() => {
        setTimeout(() => {
          var span = document.getElementsByTagName('span');
          Array.prototype.forEach.call(span, function (el) {
            el.innerHTML = el.innerHTML.replace(/&nbsp;/gi, ' ');
          });
        }, 0);
      });
  }
  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
      tags: this.tags,
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
  visible() {
    this.post.draft = !this.post.draft;
    const data = {
      draft: this.post.draft
    }
    const id = this._route.snapshot.paramMap.get('id');
    this._posts.update(id,data);
  }
  share(company) {
    if (company === 'facebook') {
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href,
        '_blank'
      );
    } else if (company === 'whatsapp') {
      window.open(
        'https://web.whatsapp.com/send?text=' + window.location.href,
        '_blank'
      );
    }
  }
  onCustomItemCreating(args) {
    let newValue = args.text;
    this._posts.createTag({ tag: newValue });
    args.customItem = newValue;
  }
}
