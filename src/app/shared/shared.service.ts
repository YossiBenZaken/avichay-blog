import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _http: HttpClient = inject(HttpClient);
  optionUrl: string = `${environment.serverUrl}/api/options`;

  assignDoc(): Observable<{selected: number}> {
    return this._http.get<{selected: number}>(`${this.optionUrl}/selected`);
  }
  getBackgrounds(): Observable<string[]> {
    return this._http.get<string[]>(`${this.optionUrl}/background`);
  }
  async saveBackground(arr) {
    // await updateDoc(doc(this._store, 'options', 'bCFJabzirrkGcdJcCi1k'), arr);
  }
}
