
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../auth.service';
import {OtherService} from '../other.service';
import {error} from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../assets/css/vendor/all.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router, private _other: OtherService) {
  }

  changeProfile = {
      enteredFirstName: '',
      enteredLastName: '',
      enteredAge: '',
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
  getGender = '';
  getPhone = '';
  getAddress = '';
  getTag = '';
  getTagList = [];
  getFollowStatus: boolean;


  ngOnInit() {
    // set all profile value from local storage
    this.jsonUserName.username = localStorage.getItem('userName');
    this._other.getOthersProfile(this.jsonUserName)
    .subscribe( (res: any) => {
      this.getUserName = res.username;
      this.getAddress = res.address;
      this.getGender = res.gender;
      this.getAge = res.age;
      this.getPhone = res.phone;
      this.getFirstName = res.firstName;
      this.getLastName = res.lastName;
      this.getTagList = res.userTags;
      console.log('tags:' + this.getTagList);
    });
    // this.getUserName = localStorage.getItem('userName');
    // this.getFirstName = localStorage.getItem('firstName');
    // this.getLastName = localStorage.getItem('lastName');
    // this.getEmail = localStorage.getItem('email');
    // this.getAge = localStorage.getItem('age');
    // this.getGender = localStorage.getItem('gender');
    // this.getPhone = localStorage.getItem('phone');
    // this.getAddress = localStorage.getItem('address');

    // console.log(localStorage);
    // this.UpdateUserInfo.username = this.getUserName;
    // this.UpdateUserInfo.firstName = this.getFirstName;
    // this.UpdateUserInfo.lastName = this.getLastName;
    // this.UpdateUserInfo.email = this.getEmail;
    // this.UpdateUserInfo.newUserName = this.getUserName;
    // this.UpdatePassword.username = this.getUserName;
  }

  submit() {
    console.log('click');
  }


  onAddTag() {
    for (const tag of this.getTagList) {
      if (tag === this.getTag) {
        alert('Existing Tag!');
        return;
      }
    }
    this.getTagList.push(this.getTag);
    this.jsontag.tag = this.getTag;
    this._other.addNewTag(this.jsontag)
      .subscribe();
  }

  onSaveProfiel() {
    this.getFirstName = this.changeProfile.enteredFirstName;
    this.getLastName = this.changeProfile.enteredLastName;
      this.getAge = this.changeProfile.enteredAge;
    this.getGender = this.changeProfile.enteredGender;
      this.getPhone = this.changeProfile.enteredPhone;
      this.getAddress = this.changeProfile.enteredAddress;
    this._other.changeProfile(this.changeProfile)
      .subscribe(res => {
        console.log('change profile success');
      });
    window.location.reload();
  }

  onFollow() {
    this.getFollowStatus = true;
    console.log('User Followed');
  }

  onunFollow() {
    this.getFollowStatus = false;
    console.log('User Unfollowed');
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
}

