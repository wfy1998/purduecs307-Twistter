
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


  ngOnInit() {
    // set all profile value from local storage
    this.jsonUserName.username = localStorage.getItem('userName');
    this._other.getOwnProfile()
    .subscribe( (res: any) => {
      this.getFirstName = res.firstName;
      this.getLastName = res.lastName;
      this.getUserName = res.username;
      this.getTagList = res.userTags;
      this.getAge = res.age;
      this.getSchool = res.school;
      this.getGender = res.gender;
      this.getPhone = res.phone;
      this.getAddress = res.address;
      console.log('tags:' + this.getTagList);
    }, err => {
      if (err.status === 400) {
        alert('Bad request! please fill in all the blanks!');
      } else if (err.status === 403) {
        alert('User Not Found!');
      } else if (err.status === 500) {
        alert('Server Error!');
      }
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

  onSaveProfile() {
    this.getFirstName = this.changeProfile.enteredFirstName;
    this.getLastName = this.changeProfile.enteredLastName;
    this.getAge = this.changeProfile.enteredAge;
    this.getSchool = this.changeProfile.enteredSchool;
    this.getGender = this.changeProfile.enteredGender;
    this.getPhone = this.changeProfile.enteredPhone;
    this.getAddress = this.changeProfile.enteredAddress;
    this._other.changeProfile(this.changeProfile)
      .subscribe(res => {
        console.log('change profile success');
      });
    localStorage.setItem('firstName', this.changeProfile.enteredFirstName);
    localStorage.setItem('lastName', this.changeProfile.enteredLastName);
    localStorage.setItem('age', this.changeProfile.enteredAge);
    localStorage.setItem('school', this.changeProfile.enteredSchool);
    localStorage.setItem('gender', this.changeProfile.enteredGender);
    localStorage.setItem('phone', this.changeProfile.enteredPhone);
    localStorage.setItem('address', this.changeProfile.enteredAddress);
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
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('age');
    localStorage.removeItem('school');
    localStorage.removeItem('gender');
    localStorage.removeItem('phone');
    localStorage.removeItem('address');
    localStorage.removeItem('searchUser');
  }
}

