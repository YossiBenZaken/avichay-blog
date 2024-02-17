import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { DxoTooltipModule, DxoLegendModule, DxiSeriesModule, DxoLabelModule, DxoConnectorModule } from 'devextreme-angular/ui/nested';
import { DxPieChartModule } from 'devextreme-angular';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardNavComponent } from '../dashboard-nav/dashboard-nav.component';

@Component({
    selector: 'app-dashboard-stats',
    templateUrl: './dashboard-stats.component.html',
    styleUrls: ['./dashboard-stats.component.css'],
    standalone: true,
    imports: [
        DashboardNavComponent,
        MatGridListModule,
        MatCardModule,
        DxPieChartModule,
        DxoTooltipModule,
        DxoLegendModule,
        DxiSeriesModule,
        DxoLabelModule,
        DxoConnectorModule,
    ],
})
export class DashboardStatsComponent implements OnInit {
  dataSource;
  private _posts = inject(PostService);
  
  ngOnInit(): void {    
    this._posts.getPosts().subscribe((posts) => {
      let p = posts.map((post) => {
        let postData = post;
        postData.views = postData.views ? postData.views : 0;
      });
      this.dataSource = p;
    });
  }

  pointClick(e: any) {
    var point = e.target;
    point.showTooltip();
    setTimeout(() => {
      point.hideTooltip();
    }, 2000);
  }
  customizeTooltip(arg) {
    return {
      text: arg.argumentText,
    };
  }
  Device() {
    return innerWidth > 450 ? 1 : 2;
  }
}
