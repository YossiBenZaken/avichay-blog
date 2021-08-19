import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css'],
})
export class DashboardStatsComponent implements OnDestroy {
  dataSource;
  subscription: Subscription;
  constructor(private _posts: PostService) {
    this.subscription = this._posts.getPosts().subscribe((posts) => {
      posts.forEach((post) => {
        post.views = post.views ? post.views : 0;
      });
      this.dataSource = posts;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
