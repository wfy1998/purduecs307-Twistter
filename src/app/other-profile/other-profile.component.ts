import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OtherService} from '../other.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit {
  changeProfile = {
    enteredFirstName: '',
    enteredLastName: '',
    enteredAge: '',
    enteredSchool: '',
    enteredGender: '',
    enteredAddress: '',
    enteredPhone: ''
  };
  jsonUserName = {
    username: ''
  };
  jsontag = {
    tag: ''
  };
  getUserName = '';
  getFirstName = '';
  getLastName = '';
  // getEmail = '';
  getAge = '';
  getSchool = '';
  getGender = '';
  getPhone = '';
  getAddress = '';
  getTag = '';
  getTagList = [];
  getFollowStatus: boolean;
  follow = {
    username: ''
  }
  constructor(private _auth: AuthService, private _router: Router, private _other: OtherService, private _activateroute: ActivatedRoute) { }

  ngOnInit() {
    console.log('the router username is,', this._activateroute.snapshot.params.username);
  }

  onFollow() {
    this.follow.username = this._activateroute.snapshot.params.username;
    this._other.followUser(this.follow).subscribe(res => {
      console.log('follow success');
    });

  }

}
