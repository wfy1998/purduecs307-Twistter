
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

  changeProfile = {
      enteredFirstName: '',
      enteredLastName: '',
      enteredAge: '',
      enteredGender: '',
      enteredAddress: '',
      enteredPhone: ''
    };
  getUserName = '';
  getFirstName = '';
  getLastName = '';
  getEmail = '';
  getAge: string;
  getGender = '';
  getPhone: string;
  getAddress = '';
  getTag = '';
  getTagNum = '';
  getTagList = [];
  getFollowStatus: boolean;


  ngOnInit() {
    // set all profile value from local storage
    this.getUserName = localStorage.getItem('userName');
    this.getFirstName = localStorage.getItem('firstName');
    this.getLastName = localStorage.getItem('lastName');
    this.getEmail = localStorage.getItem('email');
    this.getAge = localStorage.getItem('age');
    this.getGender = localStorage.getItem('gender');
    this.getPhone = localStorage.getItem('phone');
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
    this.getFirstName = this.changeProfile.enteredFirstName;
    this.getLastName = this.changeProfile.enteredLastName;
    // use string instead of number
    // if (this.changeProfile.enteredAge >= 0 && this.changeProfile.enteredAge <= 120) {
    //   this.getAge = this.changeProfile.enteredAge;
    // } else {
    //   alert('Invalid Input! Entered age must between 0 and 120.');
    // }
    this.getGender = this.changeProfile.enteredGender;
    // use string
    // if (this.changeProfile.enteredPhone.toString().length === 10) {
    //   this.getPhone = this.changeProfile.enteredPhone;
    // } else {
    //   alert('Invalid Phone Number! Phone number must be 10 digits.');
    // }
    this._other.changeProfile(this.changeProfile)
      .subscribe(res => {
        console.log('change profile success');
      });
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
