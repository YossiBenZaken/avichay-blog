import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _auth: AuthService,private _user:UserService) { }
  canActivate(): Observable<boolean>{
    return this._auth.user$.pipe(map(user => user.uid == '2cXuXRRfYaaItvmuNZESMJUtpCb2'));
  }
}
