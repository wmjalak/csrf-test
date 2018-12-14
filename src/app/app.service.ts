import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable()
export class AppService {

  // baseUrl = 'http://127.0.0.1:3000/api';
  baseUrl = 'api';

  constructor(private http: HttpClient) {}

  login(): Observable<any> {
    return this.http.post(this.baseUrl + '/login', {});
  }

  logout(): Observable<any> {
    return this.http.get(this.baseUrl + '/logout');
  }

  put(): Observable<any> {
    return this.http.put(this.baseUrl + '/put', {});
  }

  post(): Observable<any> {
    return this.http.post(this.baseUrl + '/post', {});
  }

  getCookies(): Observable<any> {
    return this.http.get(this.baseUrl + '?r=' + Math.floor(Math.random() * 100));
  }

}
