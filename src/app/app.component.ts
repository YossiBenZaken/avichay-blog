import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'avichay-blog';
  constructor(private _meta: Meta) {
    
  }
}
