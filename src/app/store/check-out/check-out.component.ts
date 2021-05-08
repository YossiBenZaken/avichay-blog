import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/product';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Promise<Observable<ShoppingCart>>;
  constructor(private _sCart: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = this._sCart.getCart();
  }

}
