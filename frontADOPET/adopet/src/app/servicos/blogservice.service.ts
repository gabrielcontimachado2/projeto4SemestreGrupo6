import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogserviceService {

  private blogUrl = 'http://127.0.0.1:8000/Blog/';

  constructor(private http: HttpClient) { }

  getBlog(){
    return this.http.get(this.blogUrl);
  }
}
