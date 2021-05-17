import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'avichay-blog';
  constructor(private _router: Router) {
    _router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        gtag('config','G-NMLYFM9H8W',{
          'page_path': event.urlAfterRedirects
        })
      }
    })
  }
}
