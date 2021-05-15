import { Product } from './../models/product';
import { take } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { CategoryService } from './../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  categories$;
  product:Product;
  id;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _cat: CategoryService,
    private _product: ProductService
  ) {
    this.categories$ = _cat.getAll();
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this._product
        .getProduct(this.id)
        .snapshotChanges()
        .pipe(take(1))
        .subscribe((p) => {
          (this.product = p.payload.data())
        } );
    }
  }
  save(product) {
    console.log(this.id);
    if (this.id) this._product.update(this.id, product);
    this._router.navigateByUrl('/dashboard');
  }
  delete() {
    if (!confirm('האם אתה בטוח שאתה רוצה למחוק את המוצר?')) return;
    this._product.delete(this.id);
    this._router.navigateByUrl('/dashboard');
  }
}
