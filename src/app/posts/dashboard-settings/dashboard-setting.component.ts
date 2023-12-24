import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-setting.component.html',
  styleUrls: ['./dashboard-setting.component.css'],
})
export class DashboardSettingsComponent {
  selectedBackground;
  backgrounds$;
  constructor(private _shared: SharedService) {
    this.backgrounds$ = _shared.getBackgrounds();
    _shared.assignDoc().then(() => {
      this.selectedBackground = _shared.optionDoc.data().selected;
    });
  }
  async saveBackground() {
    this._shared.saveBackground({ selected: Number(this.selectedBackground) });
    let options = (await this._shared.assignDoc()).data();
    document.body.style.background = `url('${options.background[options.selected]}')`;
    document.body.style.backgroundSize = '100% 100%';
    document.body.style.backgroundRepeat = 'no-repeat';
  }
  Device() {
    return innerWidth > 450 ? 1 : 2;
  }
}
