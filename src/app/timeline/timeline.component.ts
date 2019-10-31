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
  posts = {
    username: '',
    content: '',
    tags: [],
    likedByUser: [],
    numberOfLikes: Number,
    quoted: Boolean,
    comment: '',
    originName: ''
  };
  jsonUserName = {
    username: ''
  };
  getTagList = [];
  getTag = '';
  getAddedTagList = [];


  constructor(private _auth: AuthService, private _other: OtherService, private _router: Router) { }

  ngOnInit() {
    this.jsonUserName.username = localStorage.getItem('userName');
    // getTagList
    this._other.getOthersProfile(this.jsonUserName).subscribe(
      (res: any) => {
        this.getTagList = res.userTags;
      });

    // hard code, need to be changed
    this.postData.username = localStorage.getItem('userName');
    // this.postData.tags.push('a new tag');
    this._other.getMorePosts().subscribe((res: any) => {
      this.posts = res;
      console.log('the posts is: ', this.posts);
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
      .subscribe(
        res => {
          console.log('post success');
        },
        err => console.log(err)
      );
  }


  onTagToPost(tagValue: string) {
    if (this.postData.tags.length === 3) {
      alert('Too many tags!');
      return;
    }
    for (let tag of this.getAddedTagList) {
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

}
