import { Order, Shopping } from './../models/product';
import { OrderService } from './../order.service';
import { AuthService } from './../../core/auth.service';
import { Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/product';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css'],
})
export class ShoppingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userSubscription: Subscription;
  userId: string;
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _order: OrderService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this._auth.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  async placeOrder() {
    let order = new Order(this.userId, this.Shop, this.cart);
    let result = await this._order.placeOrder(order);
    this._router.navigate(['/order-success', result.id]);
  }
  public Shop: Shopping = {
    name: '',
    addressLine1: '',
    city: '',
  };
}
