import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  exports: [MatButtonModule, MatToolbarModule],
  imports: [MatButtonModule, MatToolbarModule],
})
export class MaterialModule {}
