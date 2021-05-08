import { CategoryService } from './../category.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  constructor(_cat: CategoryService) {
    this.categories$ = _cat.getAll();
   }

  ngOnInit(): void {
  }

}
