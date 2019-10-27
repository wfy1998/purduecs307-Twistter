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
    userName: '',
    tag: [],
  };

  newTag = {
    tag: ''
  };

  constructor(private _auth: AuthService, private _router: Router, private _other: OtherService) { }

  ngOnInit() {
  }

  submitPost() {
    this._other.createNewPost(this.newPost).subscribe(res => {
      console.log('create post');
    },
    err => console.log(err)
    );
  }

  submitNewTag() {
    this._other.addNewTag(localStorage.getItem('username'), this.newTag).subscribe(res => {
      console.log('add tag');
    },
      err => console.log(err)
      );
  }

}
