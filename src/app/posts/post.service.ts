import { Injectable, inject } from '@angular/core';
import { Post, Tag } from './post';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _http = inject(HttpClient);
  postUrl: string = `${environment.serverUrl}/api/posts`;
  tagUrl: string = `${environment.serverUrl}/api/tags`;

  getPosts(): Observable<Post[]> {
    return this._http.get<Post[]>(this.postUrl);
  }
  getTags(): Observable<Tag[]> {
    return this._http.get<Tag[]>(this.tagUrl);
  }
  getPostData(id: string): Observable<Post> {
    return this._http.get<Post>(`${this.postUrl}/${id}`);
  }
  createTag(data: Tag) {
    return this._http.post<Tag>(this.tagUrl, data);
  }
  create(data: Post) {
    return this._http.post<Post>(this.postUrl, data);
  }
  delete(id: string) {
    return this._http.delete(`${this.postUrl}/${id}`);
  }
  update(id: string, formData) {
    return this._http.put(`${this.postUrl}/${id}`,formData);
  }
}
