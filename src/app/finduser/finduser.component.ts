import { Component, OnInit } from '@angular/core';
import {OtherService} from '../other.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-finduser',
  templateUrl: './finduser.component.html',
  styleUrls: ['../../assets/css/vendor/all.css']
})
export class FinduserComponent implements OnInit {

  username = {
    username: ''
  };
  getEnterName = '';
  constructor(private _auth: AuthService, private _router: Router, private _other: OtherService) { }

  ngOnInit() {
    this.getEnterName = localStorage.getItem('userName');
  }

  search() {
    this._other.getOthersProfile(this.username)
      .subscribe( (res: any) => {
        console.log('find the user,', res.username);
        this._router.navigate(['/other_profile', res.username]);
      }, err => {
        if (err.status === 400) {
          alert('Bad request! please fill in the blanks!');
        } else if (err.status === 403) {
          alert(this.username.username + 'Is Not Found!');
          this.username.username = '';
        } else if (err.status === 500) {
          alert('Server Error!');
        }
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
}
