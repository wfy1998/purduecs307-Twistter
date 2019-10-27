import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Injectable({
  providedIn: 'root'
})
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
          localStorage.setItem('userName', res.user.username);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('firstName', res.user.firstName);
          localStorage.setItem('lastName', res.user.lastName);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('token', res.token);
          localStorage.setItem('address', res.user.address);
          this._cookieService.put('loginKey', res.token);
          console.log('the cookie', this._cookieService.get('loginKey'));
          this._router.navigate(['/timeline']);
        },
        err => console.log(err)
      );

  }
  getToken() {
    return this.token;
  }
}
