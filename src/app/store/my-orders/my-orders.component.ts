import { OrderService } from './../order.service';
import { AuthService } from './../../core/auth.service';
import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orders$;
  constructor(private _auth: AuthService, private _order: OrderService) {
    this.orders$ = _auth.user$.pipe(
      switchMap((u) => _order.getOrdersByUser(u.uid))
    );
  }
}
