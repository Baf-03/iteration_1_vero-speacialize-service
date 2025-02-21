import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private baseUrl: string = environment.apiBase;
  private baseUrl2: string = environment.apiBase2;
  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const params: HttpParams = req.params;
    let headers: HttpHeaders = req.headers;
    headers = headers.set('Access-Control-Allow-Origin', '*');

    const token = localStorage.getItem('token');
    if (req.url !== 'auth/signup' && token) {
      headers = headers.set('Authorization', token?.toString());
    }
    req = req.clone({
      url: `${req.params.get('s') === 'v1' ? this.baseUrl2 : this.baseUrl}${
        req.url
      }`,
      headers,
      params,
    });

    return handler.handle(req);
  }
}
