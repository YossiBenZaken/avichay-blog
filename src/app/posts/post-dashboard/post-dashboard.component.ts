import { Product } from './../../store/models/product';
import { ProductService } from './../../store/product.service';
import { CategoryService } from './../../store/category.service';
import { Observable } from 'rxjs';
import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { AngularFireStorage } from '@angular/fire/storage';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css'],
})
export class PostDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  content: string;
  buttonText: string = 'צור פוסט';
  uploadPercent: Observable<number>;
  downloadURL: Promise<any>;
  categories$;
  product:Product = new Product();
  categoryF;
  id;
  constructor(
    private _auth: AuthService,
    private _posts: PostService,
    private _storage: AngularFireStorage,
    private _title: Title,
    private _cat: CategoryService,
    private _product: ProductService,

  ) {
    this.categories$ = _cat.getAll();
    this._title.setTitle('מכשפה צבאית - פאנל ניהול')
  }

  ngOnInit(): void {}
  createPost() {
    const data: Post = {
      author: this._auth.authState.displayNAme || this._auth.authState.email,
      authorID: this._auth.currentUserId,
      content: this.content,
      title: this.title,
      image: this.image,
      published: new Date(),
      comments: []
    };
    this._posts.create(data);
    this.title = '';
    this.content = '';
    this.image = null;
    this.buttonText = 'פוסט נוצר!';
    setTimeout(() => (this.buttonText = 'צור פוסט'), 3000);
  }
  uploadImage(e) {
    const file = e.target.files[0];
    const path = `posts/${file.name}`;
    if(file.type.split('/')[0] !== 'image') {
      return alert('רק תמונות')
    } else {
      const task = this._storage.upload(path,file);
      task.then(a => a.ref.getDownloadURL().then(url => this.image = url));
      this.uploadPercent = task.percentageChanges();
    }
  }
  saveProduct(product:Product) {
    this._product.create(product);
    this.product.title = '';
    this.product.category = '';
    this.product.image = '';
    this.product.price = 0;
  }
  saveCategory(category) {
    this._cat.catCollection.add(category);
    this.categoryF = '';
  }
  delete() {
    if(!confirm('האם אתה בטוח שאתה רוצה למחוק את המוצר הזה?')){
      return;
    }
    this._product.delete(this.id);
  }
}
