export class Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
}
export class ShoppingCartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }
  get totalPrice(): number {
    return this.price * this.quantity;
  }
}
export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(private itemMap: { [productId: string]: any }) {
      this.itemMap = itemMap || {};
      for(let productId in itemMap) {
        let item = itemMap[productId].payload.doc.data();
        let idOfItem = itemMap[productId].payload.doc.id;
          this.items.push(new ShoppingCartItem({...item,id:idOfItem}));
        }
  }
  getQuantity(product: Product) {
      let item = this.itemMap.filter(e => e.payload.doc.id == product.id)[0];
      if(item) return item.payload.doc.data().quantity;
      return 0;
  }
  get totalPrice() {
      return this.items.reduce((a,b) => a + b.totalPrice,0);
  }
  get totalItemsCount() {
      return this.items.reduce((a,b)=>a + b.quantity,0);
  }
}
export class Order {
  datePlaced: number;
  items: any[];
  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart){
      this.datePlaced = new Date().getTime();
      this.items = shoppingCart.items.map(i => {
          return {
            product: {
              title: i.title,
              imageUrl: i.image,
              price: i.price
            },
            quantity: i.quantity,
            totalPrice: i.totalPrice
          }
        })
  }
}
export interface Shopping {
  name:string;
  addressLine1:string;
  city:string;
}
