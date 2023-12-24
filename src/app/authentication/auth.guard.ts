import { AuthService } from 'src/app/core/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._auth.authState;
    if (!!!user) {
      this._router.navigate(['/blog']);
    }
    return !!user;
  }
}
