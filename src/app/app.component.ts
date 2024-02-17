import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NavbarComponent],
})
export class AppComponent implements OnInit {
  title = 'avichay-blog';
  private _shared = inject(SharedService);
  backgrounds: string[];
  
  async ngOnInit() {
    this._shared.getBackgrounds().subscribe(backgrounds => this.backgrounds = backgrounds);
    this._shared.assignDoc().subscribe(({selected}) => {
      document.body.style.background = `url('${this.backgrounds[selected]}')`;
      document.body.style.backgroundSize = '100% 100%';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backdropFilter = 'blur(3px)';
    });
  }
}
