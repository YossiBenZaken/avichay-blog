import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [], imports: [CommonModule], providers: [AuthService, UserService, AsyncPipe, provideHttpClient(withInterceptorsFromDi())] })
export class CoreModule {}
