import { OrderService } from './../../store/order.service';
import { Product } from './../../store/models/product';
import { ProductService } from './../../store/product.service';
import { CategoryService } from './../../store/category.service';
import { Observable, Subscription } from 'rxjs';
import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Post } from '../post';
import { AngularFireStorage } from '@angular/fire/storage';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css'],
})
export class PostDashboardComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  title: string;
  image: string = null;
  content: string;
  tags: string[] = [];
  tagsItems: string[];
  buttonText: string = 'צור פוסט';
  uploadPercent: Observable<number>;
  uploadTempPercent: Observable<number>;
  downloadURL: Promise<any>;
  categories$;
  product: Product = new Product();
  categoryF;
  id;
  subscription: Subscription;
  subscriptionProducts: Subscription;
  subscriptionPosts: Subscription;
  displayedColumns = ['name', 'date', 'orderNumber', 'view'];
  displayedPColumns = ['title', 'price', 'edit'];
  dataSource = new MatTableDataSource();
  dataSourceProducts = new MatTableDataSource();
  dataSourcePosts;
  uploadImagePopUp: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  toolbarButtonOptions: any = {
    text: 'העלה תמונה',
    stylingMode: 'text',
    onClick: () => this.uploadImagePopUp = true
  }
  uploadTempImage:string = null;
  constructor(
    private _auth: AuthService,
    private _posts: PostService,
    private _storage: AngularFireStorage,
    private _title: Title,
    private _cat: CategoryService,
    private _product: ProductService,
    private _order: OrderService
  ) {
    this.categories$ = _cat.getAll();
    this._title.setTitle('מכשפה צבאית - פאנל ניהול');
    this.subscription = this._order.getOrders().subscribe((orders) => {
      this.dataSource.data = orders;
    });
    this.subscriptionProducts = this._product.getAll().subscribe((products) => {
      this.dataSourceProducts.data = products;
    });
    this.subscriptionPosts = this._posts.getPosts().subscribe((posts) => {
      posts.forEach(post => {
        post.views = post.views ? post.views : 0
      })
      this.dataSourcePosts = posts;
    });
    this._posts
      .getTags()
      .subscribe(
        (tags) => (this.tagsItems = tags.map((a: any) => (a = a.tag)))
      );
  }
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionPosts.unsubscribe();
    this.subscriptionProducts.unsubscribe();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  createPost() {
    this._auth.user$.subscribe(user => {
      const data: Post = {
        author: user.displayName || user.email,
        authorID: user.uid,
        content: this.content,
        title: this.title,
        image: this.image,
        published: new Date(),
        comments: [],
        views: 0,
        tags: this.tags,
      };
      this._posts.create(data);
      this.title = '';
      this.content = '';
      this.image = null;
      this.tags = [];
      this.buttonText = 'פוסט נוצר!';
      setTimeout(() => (this.buttonText = 'צור פוסט'), 3000);
    })
  }
  uploadImage(e) {
    const file = e.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('רק תמונות');
    } else {
      const task = this._storage.upload(path, file);
      task.then((a) =>
        a.ref.getDownloadURL().then((url) => (this.image = url))
      );
      this.uploadPercent = task.percentageChanges();
    }
  }
  uploadImageTemp(e) {
    const file = e.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('רק תמונות');
    } else {
      const task = this._storage.upload(path, file);
      task.then((a) =>
        a.ref.getDownloadURL().then((url) => (this.uploadTempImage = url))
      );
      this.uploadTempPercent = task.percentageChanges();
    }
  }
  copy() {
    let copyText:any = document.getElementById('imageString');
    copyText.select();
    copyText.setSelectionRange(0,99999);
    document.execCommand('copy');
  }
  saveProduct(product: Product) {
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
    if (!confirm('האם אתה בטוח שאתה רוצה למחוק את המוצר הזה?')) {
      return;
    }
    this._product.delete(this.id);
  }
  onCustomItemCreating(args) {
    let newValue = args.text;
    this._posts.createTag({ tag: newValue });
    args.customItem = newValue;
  }
  customizeTooltip(arg) {
    return {
      text: arg.argumentText
  };
  }
  pointClick(e: any) {
    var point = e.target;
    point.showTooltip();
    setTimeout(() => {
      point.hideTooltip();
    },2000)
}
}
