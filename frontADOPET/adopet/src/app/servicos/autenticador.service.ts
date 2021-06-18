import { HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Users } from '../models/users';
import { tap, shareReplay, map } from 'rxjs/operators';

import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {
   
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  
  backUrl = baseUrl;

  constructor(private http: HttpClient) { 
    this.loadUsuario();
  }

  login(login: any): Observable<boolean> {
    if(login){
    return this.http.post(this.backUrl + 'api/token/',login).pipe(
    map((data: any) => {
    if(!data){
      return false;
    }
    localStorage.setItem("access", data.access);
    localStorage.setItem('refresh', data.refresh);
    const decodedUser = this.jwtHelper.decodeToken(data.access);
    localStorage.setItem('expiration', decodedUser.exp);
    this.userInfo.next(decodedUser);
    return true;
     }));
    }
    return of(false);
  }

  loadUsuario(){
    let userdata = this.userInfo.getValue();
      if (!userdata) {
        const access_token = localStorage.getItem('access');
          if (access_token) {
            userdata = this.jwtHelper.decodeToken(access_token);
          this.userInfo.next(userdata);
          console.log("teste");
          }
      }
  }

  refreshToken(payload: any){
    return this.http.post(this.backUrl + "api/token/refresh/",payload);
  }
 
  logout() {
    localStorage.removeItem('acess');
    localStorage.removeItem('refresh');
    localStorage.removeItem('expiration');
  }
}
