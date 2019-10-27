import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OtherService {

  // private _checkUrl = 'http://localhost:3000/api/checkUserNameAndEmail';

  /* ---------- profile ----------- */
  private _getOthersProfileURL = 'http://localhost:3000/api/profile/getOthers';
  private _followUserURL = 'http://localhost:3000/api/profile/follow';
  private _unfollowUserURL = 'http://localhost:3000/api/profile/unfollow';
  private _changeFollowedTagURL = 'http://localhost:3000/api/profile/changeFollowedTag';
  private _getOwnProfileURL = 'http://localhost:3000/api/profile/';
  private _changeProfileURL = 'http://localhost:3000/api/profile/changeProfile';
  private _addNewTagURL = 'http://localhost:3000/api/profile/addTag';
  private _checkFollowStatusURL = 'http://localhost:3000/api/profile/checkFollowStatus';
  /* ---------- timeline ----------- */
  private _getMorePostsURL = 'http://localhost:3000/api/timeline/getMorePosts';
  private _likePostURL = 'http://localhost:3000/api/timeline/likePost';
  private _quoteURL = 'http://localhost:3000/api/timeline/quote';
  private _getUserLine = 'http://localhost:3000/api/timeline/getUserLine';
  /* ---------- post ----------- */
  private _createNewPostURL = 'http://localhost:3000/api/post/createNewPost';
  /* ---------- tag ----------- */
  private _getTagsURL = 'http://localhost:3000/api/tag/getTags';
  /* ---------- find user ----------- */
  private _findUser = 'http://localhost:3000/api/find/findUser';

  constructor(private http: HttpClient) { }

  /* ---------- profile ----------- */
  getOthersProfile(username) {
    return this.http.get(this._getOthersProfileURL, username);
  }
  followUser(username) {
    return this.http.post<any>(this._followUserURL, username);
  }
  unfollowUser(username) {
    return this.http.post<any>(this._unfollowUserURL, username);
  }
  changeFrollowedTag(taglist) {
    return this.http.post<any>(this._changeFollowedTagURL, taglist);
  }
  getOwnProfile() {
    return this.http.get(this._getOwnProfileURL);
  }
  changeProfile(User) {
    return this.http.post<any>(this._changeProfileURL, User);
  }
  addNewTag(tag) {
    console.log('the tag in the service is: ', tag);
    return this.http.post<any>(this._addNewTagURL, tag);
  }
  /* ---------- timeline ----------- */
  getMorePosts() {
    return this.http.get(this._getMorePostsURL);
  }
  likePost(postID) {
    return this.http.post<any>(this._likePostURL, postID);
  }
  quote(postID, username, comment) {
    return this.http.post<any>(this._quoteURL, {postID, username, comment});
  }
  getUserLine(username) {
    return this.http.get(this._getUserLine, username);
  }
  /* ---------- post ----------- */
  createNewPost(post) {
    console.log('int the service, the post is: ', post);
    return this.http.post<any>(this._createNewPostURL, post);
  }
  /* ---------- tag ----------- */
  getTags() {
    return this.http.get(this._getTagsURL);
  }
  /* ---------- find user ----------- */
  findUser(username) {
    return this.http.post<any>(this._findUser, username);
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
