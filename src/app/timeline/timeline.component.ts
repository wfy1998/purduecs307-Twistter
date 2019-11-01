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
  quotedPost = {
    comment: '',
    postID: ''
  };
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
  jsonUserName = {
    username: ''
  };
  getTagList = [];
  getTag = '';
  getAddedTagList = [];
  valueOfLikes: number;



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
      this.valueOfLikes = res.numberOfLikes;
      console.log('the posts is: ', res);
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
    this._other.createNewPost(this.postData)
      .subscribe(res => {
          console.log('post success');
          alert('Post success!');
          this.postData.content = '';
          this.postData.tags = [];
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
    for (const post of this.posts) {
      if (likedPostID === post.postID) {
        alert('Already Liked!');
        return;
      }
    }
    this.valueOfLikes++;
    this._other.likePost(likedPostID).subscribe( (res: any) => {
      console.log('Liked!');
      console.log();
    });
  }
  onQuote(quotePostID) {
    this.quotedPost.postID = quotePostID;
    this._other.quote(this.quotedPost.postID, this.quotedPost.comment).subscribe( (res: any) => {
      console.log('Quoted!');
    });
  }
}
