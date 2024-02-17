import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardNavComponent } from '../dashboard-nav/dashboard-nav.component';

@Component({
    selector: 'app-dashboard-settings',
    templateUrl: './dashboard-setting.component.html',
    styleUrls: ['./dashboard-setting.component.css'],
    standalone: true,
    imports: [
        DashboardNavComponent,
        MatGridListModule,
        MatCardModule,
        MatRadioModule,
        FormsModule,
        NgFor,
        MatButtonModule,
        AsyncPipe,
    ],
})
export class DashboardSettingsComponent implements OnInit {
  selectedBackground: number;
  backgrounds: string[];
  private _shared = inject(SharedService);
  
  ngOnInit(): void {  
    this._shared.getBackgrounds().subscribe(backgrounds => this.backgrounds = backgrounds);
    this._shared.assignDoc().subscribe((selected) => {
      this.selectedBackground = selected.selected;
    });
}

  async saveBackground() {
    this._shared.saveBackground({ selected: this.selectedBackground });
    document.body.style.background = `url('${this.backgrounds[this.selectedBackground]}')`;
    document.body.style.backgroundSize = '100% 100%';
    document.body.style.backgroundRepeat = 'no-repeat';
  }
  Device() {
    return innerWidth > 450 ? 1 : 2;
  }
}
