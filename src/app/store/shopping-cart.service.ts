import { Product, ShoppingCart } from './models/product';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  sCartCollection: AngularFirestoreCollection<any>;
  itemCollection: AngularFirestoreCollection<any>;
  constructor(private _store: AngularFirestore) {
    this.sCartCollection = this._store.collection('shopping-carts');
  }
  private getItem(cardId: string, productId: string) {
    return this._store.collection('shopping-carts').doc(cardId).collection('items').doc(productId);
  }
  private create() {
    return this.sCartCollection.add({ dateCreated: new Date().getTime() });
  }
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }
  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((i) => {
        let it: any = i.payload.data();
        if (it) {
          let quantity = it.quantity + change;
          if (quantity === 0) item$.delete();
          else
            item$.update({
              title: product.title,
              image: product.image,
              price: product.price,
              quantity: quantity,
            });
        } else {
          item$.set({
            title: product.title,
            image: product.image,
            quantity: change,
            price:product.price
          });
        }
      });
  }
  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }
  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this._store.collection('shopping-carts').doc(cartId).collection('items')
      .snapshotChanges()
      .pipe(map((x:any) => {
        return new ShoppingCart(x)
      }));
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this._store.collection('shopping-carts').doc(cartId).delete()

  }
}
