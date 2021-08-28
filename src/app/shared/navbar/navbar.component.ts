import { ShoppingCartService } from './../../store/shopping-cart.service';
import { UserService } from './../../core/user.service';
import { AuthService } from './../../core/auth.service';
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/store/models/product';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { MessagingService } from 'src/app/core/messaging.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  private readonly SHRINK_TOP_SCROLL_POSITION = 50;
  shrinkToolbar = false;
  constructor(
    public _auth: AuthService,
    private _user: UserService,
    private _sCart: ShoppingCartService,
    private _sDispatcher: ScrollDispatcher,
    private _ngZone: NgZone,
    private _message: MessagingService
  ) {
    _auth.user$.subscribe((user) => {
      if (!user) return;
      this._message.requestPermission();
      this._message.receiveMessage();
      _user.save(user);
    });
  }
  async ngOnInit() {
    this.cart$ = await this._sCart.getCart();
    this._sDispatcher
      .scrolled()
      .pipe(
        map(
          (event: CdkScrollable) =>
            event.getElementRef().nativeElement.scrollTop
        )
      )
      .subscribe((scrollTop) => {
        this._ngZone.run(
          () =>
            (this.shrinkToolbar =
              scrollTop > this.SHRINK_TOP_SCROLL_POSITION ? true : false)
        );
      });
  }
  scroll(event: any) {
    const scroll = event.target.scrollTop;
  }
}
