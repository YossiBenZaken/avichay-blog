import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._auth.user$.pipe(
      map((user) => {
        if (!!!user) {
          this._router.navigate(['/blog']);
        }
        return !!user;
      })
    );
  }
}
