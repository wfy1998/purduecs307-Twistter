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
  jsonUserName = {
    username: ''
  };
  jsontag = {
    tag: ''
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

  getUserName = '';
  getFirstName = '';
  getLastName = '';
  // getAge = '';
  // getSchool = '';
  // getGender = '';
  // getPhone = '';
  // getAddress = '';
  getTag = '';
  getTagList = [];
  getFollowStatus: boolean;
  follow = {
    username: ''
  };
  constructor(private _auth: AuthService, private _router: Router, private _other: OtherService, private _activateroute: ActivatedRoute) { }

  ngOnInit() {
    console.log('the router username is,', this._activateroute.snapshot.params.username);
    // set all profile value from local storage
    this.jsonUserName.username = this._activateroute.snapshot.params.username
    this._other.getOthersProfile(this.jsonUserName)
      .subscribe( (res: any) => {
        this.getFirstName = res.firstName;
        this.getLastName = res.lastName;
        this.getUserName = res.username;
        this.getTagList = res.userTags;
        // sensitive information
        // this.getAge = res.age;
        // this.getSchool = res.school;
        // this.getGender = res.gender;
        // this.getPhone = res.phone;
        // this.getAddress = res.address;
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

      this._other.getUserLine(this.jsonUserName).subscribe((res: any) =>{
        this.posts = res;
        console.log('the post in other profile is: ', this.posts);
      });




  }

  onFollow() {
    this.follow.username = this._activateroute.snapshot.params.username;
    this._other.followUser(this.follow).subscribe(res => {
      console.log('follow success');
    }, err => {
      if (err.status === 400) {
        alert('Bad request! Please fill in all the blanks');
      } else if (err.status === 403) {
        alert('User not found');
      } else if (err.status === 406) {
        alert('Repeated Follow!');
      } else if (err.status === 500) {
        alert('Server Error!');
      }
      console.log(err);
    });

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
