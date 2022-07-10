import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleAccess(req, next);
  }

  private handleAccess(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // only add an access token for secured end points
    // const securedEndpoints = [''];

    // if(securedEndpoints.some(url => req.urlWithParams.includes(url))) {
      const accessToken = this.oktaAuth.getAccessToken();

      // cline the request and add new header with access token
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken 
        }
      });
    // }

    return next.handle(req);
  }
  
}
