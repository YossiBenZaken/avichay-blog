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
    private _sCart: ShoppingCartService
  ) {}
  async placeOrder(order) {
    let result = await this._store.collection('orders').add(order);
    this._sCart.clearCart();
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
      ref.orderBy('userId').where('userId', '==', userId)
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
