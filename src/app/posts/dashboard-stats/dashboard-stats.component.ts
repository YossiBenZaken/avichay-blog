import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css'],
})
export class DashboardStatsComponent {
  dataSource;
  constructor(private _posts: PostService) {
    this._posts.getPosts().then((posts) => {
      let p = posts.map((post) => {
        let postData = post.data();
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
