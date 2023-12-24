import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(private _auth: AuthService,private _user:UserService) { }
  canActivate(): Observable<boolean>{
    return of(['2cXuXRRfYaaItvmuNZESMJUtpCb2','b8txRyLkBNZ1jQsiCkKtKO7nD6o2'].includes(this._auth.authState.uid));
  }
}
