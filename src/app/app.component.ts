import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from './shared/shared.service';
declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'avichay-blog';
  constructor(private _router: Router, private _shared: SharedService) {
    _router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-NMLYFM9H8W', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
    _shared.optionDoc.get().subscribe((result) => {
      let options = result.data();
      document.body.style.background = `url(${
        options.background[options.selected]
      })`;
      document.body.style.backgroundSize = '100% 100%';
      document.body.style.backgroundRepeat = 'no-repeat';
    });
  }
}
