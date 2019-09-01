import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-findpassword',
  templateUrl: './findPassword.component.html',
  styleUrls: ['./findPassword.component.css']
})


export class FindPasswordComponent implements OnInit {
  registerUserData =  {};

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit() {
  }
  submitEmail() {
    console.log(this.registerUserData);
    console.log('tset2.0');
    this.authService.findPassword(this.registerUserData)
      .subscribe(data => {
        console.log(data);
        if (data.success) {
          console.log('find the email lol');
        }
      });
  }
}
