import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  constructor(private _cart: ShoppingCartService) { }
  addToCart() {
    this._cart.addToCart(this.product);
  }
  removeFromCart(){
    this._cart.removeFromCart(this.product);
  }
}
