import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {OtherService} from '../other.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  postData = {
    username: '',

  };
  constructor(private _auth: AuthService, private _other, private _router: Router) { }

  ngOnInit() {
  }

  newPost() {

    this._other.creatNewPost(this.postData)
      .subscribe(
        res => {
          console.log('post success');
        },
        err => console.log(err)
      );
  }

}
