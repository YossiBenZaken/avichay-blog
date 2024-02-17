import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { AppRoutingModule } from './app/app-routing.module';
import { PostsModule } from './app/posts/posts.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from './app/shared/shared.module';
import { CoreModule } from './app/core/core.module';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ɵROUTER_PROVIDERS } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

  bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore()), provideAuth(() => getAuth()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage()), CoreModule, SharedModule, PostsModule, AppRoutingModule, AuthenticationModule),
        ɵROUTER_PROVIDERS,
        provideAnimations(),
    ]
})
  .catch(err => console.error(err));
