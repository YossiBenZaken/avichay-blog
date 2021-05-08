import { ShoppingCartService } from './../../store/shopping-cart.service';
import { UserService } from './../../core/user.service';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/store/models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  cart$: Observable<ShoppingCart>;

  constructor(public _auth: AuthService, private _user: UserService,private _sCart: ShoppingCartService) {
    _auth.user$.subscribe((user) => {
      if (!user) return;
      _user.save(user);
    });
  }
  async ngOnInit() {
    this.cart$ = await this._sCart.getCart();
  }
}
