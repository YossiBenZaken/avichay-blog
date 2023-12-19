import { StoreModule } from './../store/store.module';
import { CategoryService } from './../store/category.service';
import { ProductService } from './../store/product.service';
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
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { DashboardStoreComponent } from './dashboard-store/dashboard-store.component';
import { DashboardSettingsComponent } from './dashboard-settings/dashboard-setting.component';

const routes: Routes = [
  { path: 'blog', component: PostListComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  {
    path: 'dashboard',
    component: DashboardStatsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dashboard/store',
    component: DashboardStoreComponent,
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
  declarations: [
    PostDashboardComponent,
    PostDetailComponent,
    PostListComponent,
    SafeHtmlPipe,
    DashboardStatsComponent,
    DashboardNavComponent,
    DashboardStoreComponent,
    DashboardSettingsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [PostService, ProductService, CategoryService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostsModule {}
