
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../auth.service';
import {OtherService} from '../other.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../assets/css/vendor/all.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router, private _other: OtherService) {
  }

  getUserName = '';
  getFirstName = '';
  getLastName = '';
  getEmail = '';
  getAge: number;
  getGender = '';
  getPhone: number;
  getAddress = '';
  getTag = '';
  getTagNum = '';
  getTagList = [];
  getFollowStatus: boolean;
  enteredFirstName: string;
  enteredLastName: string;
  enteredAge: number;
  enteredGender: string;
  enteredAddress: string;
  enteredPhone: number;

  ngOnInit() {
    // set all profile value from local storage
    this.getUserName = localStorage.getItem('userName');
    this.getFirstName = localStorage.getItem('firstName');
    this.getLastName = localStorage.getItem('lastName');
    this.getEmail = localStorage.getItem('email');
    this.getAge = Number(localStorage.getItem('age'));
    this.getGender = localStorage.getItem('gender');
    this.getPhone = Number(localStorage.getItem('phone'));
    this.getAddress = localStorage.getItem('address');

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
    this.getTagNum += 1;
    this._other.addNewTag(this.getTag);
  }

  onSaveProfiel() {
    this.getFirstName = this.enteredFirstName;
    this.getLastName = this.enteredLastName;
    if (this.enteredAge >= 0 && this.enteredAge <= 120) {
      this.getAge = this.enteredAge;
    } else {
      alert('Invalid Input! Entered age must between 0 and 120.');
    }
    this.getGender = this.enteredGender;
    if (this.enteredPhone.toString().length === 10) {
      this.getPhone = this.enteredPhone;
    } else {
      alert('Invalid Phone Number! Phone number must be 10 digits.');
    }
  }

  onFollow() {
    this.getFollowStatus = true;
    console.log('User Followed');
  }

  onunFollow() {
    this.getFollowStatus = false;
    console.log('User Unfollowed');
  }
}
