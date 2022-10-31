import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = 'http://localhost:8083/distributor'
  url = environment.url;
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  loggedInUser: BehaviorSubject<User> = new BehaviorSubject<User>(this.getUserFromLocalStorage());

  /*public login(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.url}/user/login`, user, { observe: 'response' })
  }*/

  public login(user: User): Observable<User> {
    return this.http.post<User>(`${this.loginUrl}/loginToPortalYasseer`, user)
  }

  public getTransaction(): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/updatePortalYasseerUser`,{})
  }

  public logOut() {
    this.loggedInUser.next(new User());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  public setTokenToLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }
  public getTokenFromLocalStorage(): string {
    return localStorage.getItem('token') || '';
  }

  public setUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  public getUserFromLocalStorageObserve(): Observable<User> {
    return JSON.parse(localStorage.getItem('user')!) as Observable<User>;
  }
  public getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }



  public isLoggedIn(): boolean {
    const token = this.getTokenFromLocalStorage();

    try {
      this.jwtHelper.decodeToken(token);
    }catch (e) {
      this.logOut();
      return false;
    }

    if (token != null && token !== '' && this.jwtHelper.decodeToken(token)) {
      if (this.jwtHelper.decodeToken(token).sub != null && this.jwtHelper.decodeToken(token).sub != '' && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      } else {
        console.log('token is expired at :' + this.jwtHelper.getTokenExpirationDate(token));
        return false;
      }
    } else {
      this.logOut();
      return false;
    }
  }
}
