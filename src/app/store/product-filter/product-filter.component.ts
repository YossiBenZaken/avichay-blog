import { CategoryService } from './../category.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  constructor(_cat: CategoryService,private _router:Router) {
    this.categories$ = _cat.getAll();
   }

  ngOnInit(): void {
  }
  onChange(e) {
    this.categories$.subscribe(a => {
      if(e.target.value == 'הצג הכל') this._router.navigateByUrl('/store');
      else {
        a = a.filter(cat => cat.name == e.target.value)[0];
        this._router.navigateByUrl(`/store?cat=${a.id}`)
      }
    })
  }

}
