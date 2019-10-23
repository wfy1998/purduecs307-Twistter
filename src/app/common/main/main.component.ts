import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router, private _cookieService: CookieService) { }
  loginUserData = {};
  private token: string;



  ngOnInit() {
    // this._cookieService.put('test', localStorage.getItem('token'));
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res.body);
          this.token = res.token;
          localStorage.setItem('token', res.token);
          localStorage.setItem('userName', res.username);
          localStorage.setItem('email', res.email);
          localStorage.setItem('firstName', res.firstName);
          localStorage.setItem('lastName', res.lastName);
          localStorage.setItem('role', res.role);
          localStorage.setItem('token', res.token);
          localStorage.setItem('address', res.address);
          this._cookieService.put('loginKey', res.token);
          console.log('the cookie', this._cookieService.get('loginKey'));
          this._router.navigate(['/profile']);
        },
        err => console.log(err)
      );

  }
  getToken() {
    return this.token;
  }
}