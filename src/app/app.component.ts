import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  responseString = '';

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.onGetCookies();
  }

  onGetCookies() {
    this.appService.getCookies().subscribe(result => {
      this.responseString = JSON.stringify(result);
    });
  }

  onLogin() {
    this.appService.login().subscribe(result => {
      this.responseString = JSON.stringify(result);
    });
  }

  onLogout() {
    this.appService.logout().subscribe(result => {
      this.responseString = JSON.stringify(result);
    });
  }

  onPut() {
    this.appService.put().subscribe(result => {
      this.responseString = JSON.stringify(result);
    });
  }

  onPost() {
    this.appService.post().subscribe(result => {
      this.responseString = JSON.stringify(result);
    });
  }

}
