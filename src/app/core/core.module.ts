import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, UserService, AsyncPipe],
})
export class CoreModule {}
