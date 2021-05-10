import { SharedModule } from './../shared/shared.module';
import { OrderService } from './order.service';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { ShoppingCartService } from './shopping-cart.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products/products.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ShoppingFormComponent } from './shopping-form/shopping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: 'store', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'order-success/:id', component: OrderSuccessComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'view-order/:id',component: ViewOrderComponent},
  { path: 'edit-product/:id', component: EditProductComponent}
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ViewOrderComponent,
    ShoppingFormComponent,
    ShoppingCartSummaryComponent,
    EditProductComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [ShoppingCartService, CategoryService, ProductService,OrderService],
  exports: [ProductCardComponent]
})
export class StoreModule {}
