import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MessagingService } from './messaging.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, UserService, MessagingService, AsyncPipe],
})
export class CoreModule {}
