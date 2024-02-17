import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        ScrollingModule,
        NavbarComponent,
    ],
    exports: [
        CommonModule,
        MaterialModule,
        NavbarComponent,
        FormsModule,
        RouterModule,
    ],
})
export class SharedModule {}
