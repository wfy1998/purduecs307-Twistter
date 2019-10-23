import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) {

  }

  getUserName = '';
  getFirstName = '';
  getLastName = '';
  getEmail = '';
  getAge = '';
  getSchool = '';
  getGender = '';
  getPhone = '';
  getAddress = '';

  ngOnInit() {
    // set all profile value from local storage
    this.getUserName = localStorage.getItem('userName');
    this.getFirstName = localStorage.getItem('firstName');
    this.getLastName = localStorage.getItem('lastName');
    this.getEmail = localStorage.getItem('email');
    this.getAge = localStorage.getItem('age');
    this.getSchool = localStorage.getItem('school');
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


}

