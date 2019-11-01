import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {OtherService} from '../other.service';
import {Router} from '@angular/router';
import {NumberValueAccessor} from '@angular/forms/src/directives/number_value_accessor';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['../../assets/css/vendor/all.css']
})
export class TimelineComponent implements OnInit {
  postData = {
    username: '',
    content: '',
    tags: [],
  };
  quotedPostComment: string[] = [];
  quotedHighLightedPostComment: string[] = [];
  posts = [
    // username: '',
    // content: '',
    // tags: [],
    // likedByUser: [],
    // numberOfLikes: Number,
    // quoted: Boolean,
    // comment: '',
    // originName: ''
  ];
  highLightedPosts = [];
  jsonUserName = {
    username: ''
  };
  jsonLikedID = {
    postID: ''
  };
  getTagList = [];
  getTag = '';
  getAddedTagList = [];

  // valueOfLikes: Array<any> = [];



  constructor(private _auth: AuthService, private _other: OtherService, private _router: Router) { }

  ngOnInit() {
    this.jsonUserName.username = localStorage.getItem('userName');
    // getTagList
    this._other.getOwnProfile().subscribe(
      (res: any) => {
        this.getTagList = res.userTags;
      });

    // hard code, need to be changed
    this.postData.username = localStorage.getItem('userName');
    // this.postData.tags.push('a new tag');
    this._other.getMorePosts().subscribe((res: any) => {
      this.posts = res;
      // this.valueOfLikes.push(res.numberOfLikes);
      console.log('the posts is: ', res);
    });
    // todo check it is works
    this._other.getHighlightedPosts().subscribe((res: any) => {
      this.highLightedPosts = res;
      // this.valueOfLikes.push(res.numberOfLikes);
      console.log('the high lighted posts is: ', res);
    });


  }
  logOut() {
    localStorage.removeItem('email');
    localStorage.removeItem('address');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('searchUser');
  }

  newPost() {
    if (this.postData.content.length >= 280) {
      console.log(this.postData.content.length );
      alert('the maximum characters is 280 ');
      return;
    }
    this._other.createNewPost(this.postData)
      .subscribe(res => {
          console.log('post success');
          alert('Post success!');

          }, err => {
          if (err.status === 400) {
            alert('Bad request! Please fill in content and choose tags!');
          } else if (err.status === 401) {
            alert('Unmatched username compared to your token');
          } else if (err.status === 500) {
            alert('Post creation failed!');
          }
          console.log(err);
      });
    this.postData.content = '';
    this.postData.tags = [];
  }

  onTagToPost(tagValue: string) {
    if (this.postData.tags.length === 3) {
      alert('Too many tags!');
      return;
    }
    for (const tag of this.getAddedTagList) {
      if (tag === tagValue) {
        alert('Existed tag!');
        return;
      }
    }
    this.getTag = tagValue;
    this.getAddedTagList.push(this.getTag);
    this.postData.tags.push(this.getTag);
    console.log(this.postData.tags[0]);
  }
  onRemoveTag() {
    window.location.reload();
  }

  onAddLike(likedPostID) {
    this.jsonLikedID.postID = likedPostID;
    this._other.likePost(this.jsonLikedID).subscribe( (res: any) => {
      console.log('Liked!');
    });
    alert('Liked!');
    window.location.reload();
  }
  onQuote(quotePostID, index) {
    console.log(quotePostID);
    console.log(this.quotedPostComment[index]);
    this._other.quote(quotePostID, this.quotedPostComment[index]).subscribe( (res: any) => {
    });
    console.log('Quoted!');
  }

  onQuoteHighLightedPost(quotePostID, index) {
    console.log(quotePostID);
    console.log(this.quotedHighLightedPostComment[index]);
    this._other.quote(quotePostID, this.quotedHighLightedPostComment[index]).subscribe( (res: any) => {
    });
    console.log('Quoted!');
  }



}
