import { AuthService } from 'src/app/core/auth.service';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private _auth = inject(AuthService);
  private _router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._auth.authState;
    if (!!!user) {
      this._router.navigate(['/blog']);
    }
    return !!user;
  }
}
