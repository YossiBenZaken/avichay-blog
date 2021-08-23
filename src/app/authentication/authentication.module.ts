import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthenticationComponent,
  },
  { path: 'edit-profile', component: EditProfileComponent },
];

@NgModule({
  declarations: [AuthenticationComponent, EditProfileComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AuthenticationModule {}
