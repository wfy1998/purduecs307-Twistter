import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OtherService {

  // private _checkUrl = 'http://localhost:3000/api/checkUserNameAndEmail';
  private _creatNewPost = 'http://localhost:3000/api/creatNewPost';
  

  constructor(private http: HttpClient) { }

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
