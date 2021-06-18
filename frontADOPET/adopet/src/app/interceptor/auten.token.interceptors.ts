import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AutenticadorService } from 'src/app/servicos/autenticador.service';
import { switchMap, map, flatMap, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthTokenInterceptors implements HttpInterceptor {
  jwtHelper = new JwtHelperService();
  constructor(private authService: AutenticadorService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/api/token/') > -1) {
      return next.handle(req);
    }
    const access_token = localStorage.getItem('access');
    if (access_token) {
      const expiration = localStorage.getItem('expiration');
      if (Date.now() < Number(expiration) * 1000) {
        const transformedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${access_token}`),
        });
        return next.handle(transformedReq);
      }
      const payload = {
        access_token: access_token,
        refresh_token: localStorage.getItem('refresh'),
      };
      return this.authService.refreshToken(payload).pipe(
        switchMap((newTokens: any) => {
          localStorage.setItem('access', newTokens.access_token);
          localStorage.setItem('refresh', newTokens.refresh_token);
          const decodedUser = this.jwtHelper.decodeToken(
            newTokens.access_token
          );
          localStorage.setItem('expiration', decodedUser.exp);
          this.authService.userInfo.next(decodedUser);
          const transformedReq = req.clone({
            headers: req.headers.set(
              'Authorization',
              `Bearer ${newTokens.access_token}`
            ),
          });
          return next.handle(transformedReq);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}