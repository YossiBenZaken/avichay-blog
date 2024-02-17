import { AuthService } from './../../core/auth.service';
import { Component, NgZone, OnInit, inject } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgClass } from '@angular/common';
import { BidiModule } from '@angular/cdk/bidi';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: [
        MatSidenavModule,
        BidiModule,
        NgIf,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        RouterLink,
        CdkScrollable,
        MatToolbarModule,
        NgClass,
        RouterOutlet,
    ],
})
export class NavbarComponent implements OnInit {
  private readonly SHRINK_TOP_SCROLL_POSITION = 50;
  shrinkToolbar = false;
  public _auth = inject(AuthService);
  private _sDispatcher = inject(ScrollDispatcher);
  private _ngZone = inject(NgZone);

  async ngOnInit() {
    this._sDispatcher
      .scrolled()
      .pipe(
        map(
          (event: CdkScrollable) =>
            event.getElementRef().nativeElement.scrollTop
        )
      )
      .subscribe((scrollTop) => {
        this._ngZone.run(
          () =>
            (this.shrinkToolbar =
              scrollTop > this.SHRINK_TOP_SCROLL_POSITION ? true : false)
        );
      });
  }
  scroll(event: any) {
    const scroll = event.target.scrollTop;
  }
}
