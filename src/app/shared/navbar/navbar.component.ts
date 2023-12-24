import { UserService } from './../../core/user.service';
import { AuthService } from './../../core/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private readonly SHRINK_TOP_SCROLL_POSITION = 50;
  shrinkToolbar = false;
  constructor(
    public _auth: AuthService,
    private _user: UserService,
    private _sDispatcher: ScrollDispatcher,
    private _ngZone: NgZone,
  ) {
  }
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
