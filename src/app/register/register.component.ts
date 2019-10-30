import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthService} from '../auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  registerUserData =  {};

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }
  ngOnInit() {
  }
  onSubmit() {
    console.log('click');
    console.log(this.registerUserData);
    this.authService.createUser(this.registerUserData)
      .subscribe(data => {
        console.log(data);
        console.log('yes');
        this.router.navigate(['/']);
      }, err => {
        if (err.status === 400) {
          alert('Bad request! Please fill in all blanks');
        } else if (err.status === 500) {
          alert('Creation Failed on the Server!');
        }
        console.log(err);
      });
  }
}

