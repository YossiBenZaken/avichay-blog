import { ProductService } from './../product.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product, ShoppingCart } from './../models/product';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  constructor(
    private _route: ActivatedRoute,
    private _shopping: ShoppingCartService,
    private _product: ProductService
  ) {}

  async ngOnInit() {
    this.cart$ = await this._shopping.getCart();
    this.populateProduct();
  }
  private populateProduct() {
    this._product
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this._route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('cat');
        this.applyFilter();
      });
  }
  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((p) => p.category === this.category)
      : this.products;
  }
}
