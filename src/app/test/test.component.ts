import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../auth.service';
import {OtherService} from '../other.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  newPost = {
    content: '',
    username: '',
    tags: [],
  };

  tag = {
    tag: ''
  };

  followName = {
    username: ''
  };
  unfollowName = {
    username: ''
  };

  constructor(private _auth: AuthService, private _router: Router, private _other: OtherService) { }

  ngOnInit() {

    this.newPost.content = 'this is a new post';
    this.newPost.username = 'wang';
    this.newPost.tags = ['fuck', 'cao'];
    this.tag.tag = 'a new tag';
  }

  submitPost() {
    console.log('int the service, the post is: ', this.newPost);
    this._other.createNewPost(this.newPost).subscribe(res => {
      console.log('create post');
    },
    err => console.log(err)
    );
  }

  submitNewTag() {
    this._other.addNewTag(this.tag).subscribe(res => {
      console.log('add tag success:', this.tag);
    },
      err => console.log(err)
      );
  }
  follow() {
    this._other.followUser(this.followName)
      .subscribe(res => {
        console.log('follow success');
      });
  }

  unfollow() {
    this._other.unfollowUser(this.unfollowName)
      .subscribe(res => {
        console.log('follow success');
      });

  }

}
