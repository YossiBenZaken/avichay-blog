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

const routes: Routes = [
  { path: 'blog', component: PostListComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  { path: 'dashboard', component: PostDashboardComponent,canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [
    PostDashboardComponent,
    PostDetailComponent,
    PostListComponent,
    SafeHtmlPipe
  ],
  imports: [SharedModule, RouterModule.forChild(routes),StoreModule],
  providers: [PostService,ProductService,CategoryService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostsModule {}
