import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _checkUrl = 'http://localhost:3000/api/checkUserNameAndEmail';
  private _loginUserURL = 'http://localhost:3000/api/login';
  private _createUserURL = 'http://localhost:3000/api/register';
  private _deleteAccountURL = 'http://localhost:3000/api/delete';

  constructor(private http: HttpClient) { }

  loginUser(user) {
    return this.http.post<any>(this._loginUserURL, user);
  }
  createUser(user) {
    return this.http.post<any>(this._createUserURL, user);
  }
  deleteAccount() {
    return this.http.post<any>(this._deleteAccountURL, {});
  }

  // checkUserNameAndEmail(userName: string, email: string) {
  //   const params = new HttpParams()
  //     .set('userName', userName)
  //     .set('email', email)
  //
  //   return this.http.get<{message: string}>(
  //     this._checkUrl, {params: params}
  //   );
  // }

}
