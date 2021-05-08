import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product, ShoppingCart } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions= true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private _cart: ShoppingCartService) { }
  addToCart() {
    this._cart.addToCart(this.product);
  }
}
