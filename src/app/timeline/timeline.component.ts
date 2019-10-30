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

  constructor(private _auth: AuthService, private _other: OtherService, private _router: Router) { }

  ngOnInit() {

    // hard code, need to be changed
    this.postData.username = localStorage.getItem('userName');
    this.postData.tags.push('a new tag');
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



}
