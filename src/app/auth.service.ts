import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _checkUrl = 'http://localhost:3000/api/checkUserNameAndEmail';
  private _createUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';
  private _findPasswordUrl = 'http://localhost:3000/api/findPassword';
  private _creatNewPost = 'http://localhost:3000/api/creatNewPost';

  constructor(private http: HttpClient) { }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  createUser(user) {
    return this.http.post<any>(this._createUrl, user);
  }
  findPassword(email) {
    return this.http.post<any>(this._findPasswordUrl, email);
  }
  creatNewPost(post) {
    return this.http.post<any>(this._creatNewPost, post);
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
