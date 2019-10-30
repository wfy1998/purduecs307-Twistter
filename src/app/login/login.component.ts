import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {AuthService} from '../auth.service';
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(private _auth: AuthService, private _router: Router, private _cookieService: CookieService) {
  }

  ngOnInit() {
    this._cookieService.put('test', 'test');
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this._cookieService.put('login cookie', res.token);
          this._router.navigate(['/timeline']);
        },
        err => console.log(err)
      );
    console.log(this._cookieService.get('test'));
  }
}
