import { map } from 'rxjs/operators';
import { Product } from './models/product';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productCollection: AngularFirestoreCollection<Product>;
  constructor(private _store: AngularFirestore) {
    this.productCollection = this._store.collection('products');
  }
  create(product: Product) {
    this.productCollection.add(product);
  }
  getAll() {
    return this.productCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
  get(productId: string) {
    return this._store.collection('products').doc<Product>(productId);
  }
  getProduct(productId: string) {
    return this._store.doc<Product>(`products/${productId}`);
  }
  update(productId: string, product: Product) {
    return this.getProduct(productId).update(product);
  }
  delete(productId: string) {
    return this.getProduct(productId).delete();
  }
}
