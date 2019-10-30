import { Component, OnInit } from '@angular/core';
import {OtherService} from '../other.service';

@Component({
  selector: 'app-finduser',
  templateUrl: './finduser.component.html',
  styleUrls: ['./finduser.component.css']
})
export class FinduserComponent implements OnInit {

  getEnterName = '';
  constructor(private _other: OtherService) { }

  ngOnInit() {
    this.getEnterName = localStorage.getItem('userName');
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

  onClickSearch(postInput: HTMLTextAreaElement) {
    if (postInput.value !== '') {
      localStorage.setItem('searchUser', postInput.value);
      window.location.href = 'this._other.findUser(postInput.value)';
    } else {
      alert('Please enter a username');
    }
  }
}
