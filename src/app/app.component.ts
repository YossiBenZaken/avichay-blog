import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'avichay-blog';
  constructor(private _shared: SharedService) {
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
