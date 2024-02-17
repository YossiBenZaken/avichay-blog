import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {
  private _auth = inject(AuthService);
  
  canActivate(): Observable<boolean>{
    return of(['2cXuXRRfYaaItvmuNZESMJUtpCb2','b8txRyLkBNZ1jQsiCkKtKO7nD6o2'].includes(this._auth.authState.uid));
  }
}
