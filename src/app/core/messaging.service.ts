import { AuthService } from './auth.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  userCollection: AngularFirestoreCollection<any>;
  constructor(
    private _fireMessaging: AngularFireMessaging,
    private _store: AngularFirestore,
    private _auth: AuthService
  ) {
    this.userCollection = this._store.collection('users');
  }
  requestPermission() {
    Notification.requestPermission().then((p) => {
      if (p == 'granted') {
        this._fireMessaging.getToken.subscribe((token) => {
          if (this._auth.authenticated) {
            this.userCollection.doc(this._auth.currentUserId).update({
              token: token,
            });
          }
        });
      }
    });
  }
  receiveMessage() {
    this._fireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
}
