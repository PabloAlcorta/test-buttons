import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged:boolean = false;
  user: any;
  loading=false;

  constructor() {}

  ngOnInit() {
  	this._logged();
  }

  _logged() {
	  let condition =  sessionStorage.getItem('user') ? true : false;
    if (condition)
      this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    return condition;
  }

}