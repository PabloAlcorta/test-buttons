import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged:boolean = false;
  user: any;
  loading=false;

  constructor( private router: Router ) {}

  ngOnInit() {
  	this._logged();
  }

  _logged() {
	  let condition =  localStorage.getItem('user') ? true : false;
    if (condition)
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    return condition;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}