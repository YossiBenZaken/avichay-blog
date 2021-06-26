import { StoreModule } from './store/store.module';
import { Routes, RouterModule, ɵROUTER_PROVIDERS } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsModule } from './posts/posts.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./store/store.module').then((m) => m.StoreModule),
  },
  { path: '**', redirectTo: '/blog', pathMatch: 'full' },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    PostsModule,
    StoreModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ɵROUTER_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
