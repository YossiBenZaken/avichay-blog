import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from 'src/app/store/category.service';
import { Product } from 'src/app/store/models/product';
import { OrderService } from 'src/app/store/order.service';
import { ProductService } from 'src/app/store/product.service';

@Component({
  selector: 'app-dashboard-store',
  templateUrl: './dashboard-store.component.html',
  styleUrls: ['./dashboard-store.component.css'],
})
export class DashboardStoreComponent implements OnDestroy, AfterViewInit {
  categoryF;
  categories$: Observable<any[]>;
  dataSource = new MatTableDataSource();
  dataSourceProducts = new MatTableDataSource();
  product: Product = new Product();
  subscription: Subscription;
  subscriptionProducts: Subscription;
  displayedColumns = ['name', 'date', 'orderNumber', 'view'];
  displayedPColumns = ['title', 'price', 'edit'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _cat: CategoryService,
    private _order: OrderService,
    private _product: ProductService
  ) {
    this.categories$ = _cat.getAll();
    this.subscription = _order.getOrders().subscribe((orders) => {
      this.dataSource.data = orders;
    });
    this.subscriptionProducts = this._product.getAll().subscribe((products) => {
      this.dataSourceProducts.data = products;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionProducts) {
      this.subscriptionProducts.unsubscribe();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  saveCategory(category) {
    this._cat.catCollection.add(category);
    this.categoryF = '';
  }
  saveProduct(product: Product) {
    this._product.create(product);
    this.product.title = '';
    this.product.category = '';
    this.product.image = '';
    this.product.price = 0;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
