import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AuthenticationComponent } from '../authentication/authentication.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    ScrollingModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NavbarComponent,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
  ],
})
export class SharedModule {}
