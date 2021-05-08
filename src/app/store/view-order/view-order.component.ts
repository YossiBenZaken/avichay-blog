import { OrderService } from './../order.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {
  id;
  order;
  items: any[];
  products: Product[] = [];
  constructor(private _route: ActivatedRoute,private _order: OrderService) { 
    this.id = this._route.snapshot.paramMap.get('id');
    if(this.id) {
      this._order.get(this.id).subscribe(p => this.order = p);
    }
  }


}
