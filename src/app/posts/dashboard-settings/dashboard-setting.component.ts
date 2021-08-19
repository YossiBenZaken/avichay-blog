import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-setting.component.html',
  styleUrls: ['./dashboard-setting.component.css'],
})
export class DashboardSettingsComponent implements OnDestroy {
  selectedBackground;
  backgrounds$;
  subscriptionBackground: Subscription;
  constructor(private _shared: SharedService) {
    this.backgrounds$ = _shared.getBackgrounds();
    this.subscriptionBackground = this._shared.optionDoc
      .get()
      .subscribe((option) => {
        this.selectedBackground = option.data().selected;
      });
  }
  ngOnDestroy() {
    if (this.subscriptionBackground) {
      this.subscriptionBackground.unsubscribe();
    }
  }
  saveBackground() {
    this._shared.saveBackground({ selected: Number(this.selectedBackground) });
    this._shared.optionDoc.get().subscribe((result) => {
      let options = result.data();
      document.body.style.background = `url(${
        options.background[options.selected]
      })`;
      document.body.style.backgroundSize = '100% 100%';
      document.body.style.backgroundRepeat = 'no-repeat';
    });
  }
  Device() {
    return innerWidth > 450 ? 1 : 2;
  }
}
