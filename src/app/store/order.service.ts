import { AuthService } from './../core/auth.service';
import { Order } from './models/product';
import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private _store: AngularFirestore,
    private _sCart: ShoppingCartService,
    private _auth: AuthService
  ) {}
  async placeOrder(order:Order) {
    let result = await this._store.collection('orders').add({
      datePlaced:order.datePlaced,
      items: order.items,
      shipping: order.shipping,
      userId: this._auth.currentUserId
    });
    let clearOrder = await this._sCart.clearCart()
    return result;
  }
  getOrders() {
    const productRef = this._store.collection('orders', (ref) =>
      ref.orderBy('datePlaced')
    );
    return productRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c: any) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      )
    );
  }
  getOrdersByUser(userId: string) {
    const ordersRef = this._store.collection('orders', (ref) =>
      ref.orderBy('userId')
    );
    return ordersRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c: any) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      );
  }
  get(orderId) {
    return this._store.collection('orders').doc(orderId).valueChanges();
  }
}
