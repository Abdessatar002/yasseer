import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../components/login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (request.url.includes(`${this.loginService.url}/user/login`))
    //   return next.handle(request);
    const token = this.loginService.getTokenFromLocalStorage();
    console.log('this is token '+ token);
    const requestClone = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(requestClone);
  }
}
