import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  exports: [MatButtonModule, MatToolbarModule,MatExpansionModule, MatInputModule, MatProgressBarModule],
  imports: [MatButtonModule, MatToolbarModule,MatExpansionModule, MatInputModule, MatProgressBarModule],
})
export class MaterialModule {}
