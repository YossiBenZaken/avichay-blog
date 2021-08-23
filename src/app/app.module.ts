import { StoreModule } from './store/store.module';
import { ɵROUTER_PROVIDERS } from '@angular/router';
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
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
    AppRoutingModule,
    AuthenticationModule,
  ],
  providers: [ɵROUTER_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
