import { SafeHtmlPipe } from './../safe-html.pipe';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { PostService } from './post.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { AuthGuardService } from '../shared/auth-guard.service';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { DashboardSettingsComponent } from './dashboard-settings/dashboard-setting.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'blog', component: PostListComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  {
    path: 'dashboard',
    component: DashboardStatsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dashboard/settings',
    component: DashboardSettingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dashboard/posts',
    component: PostDashboardComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        PostDashboardComponent,
        PostDetailComponent,
        PostListComponent,
        SafeHtmlPipe,
        DashboardStatsComponent,
        DashboardNavComponent,
        DashboardSettingsComponent,
        HttpClientModule
    ],
    providers: [PostService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostsModule {}
