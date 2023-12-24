import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'avichay-blog';
  constructor(private _shared: SharedService) {

  }
  
  async ngOnInit() {
    let options = (await this._shared.assignDoc()).data();
    document.body.style.background = `url('${options.background[options.selected]}')`;
    document.body.style.backgroundSize = '100% 100%';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backdropFilter = 'blur(3px)';
  }
}
