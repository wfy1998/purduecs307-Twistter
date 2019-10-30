import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {OtherService} from '../other.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  username = {
   username: ''
  };

  constructor(private _auth: AuthService, private _router: Router, private _other: OtherService) { }
  ngOnInit() {
  }

  search() {
    this._other.getOthersProfile(this.username).subscribe( (res: any) => {
      console.log('find the user,', res.username);
      this._router.navigate(['/other_profile', res.username]);
    });

  }

}
