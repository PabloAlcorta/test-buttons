import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cards-info',
  templateUrl: './cards-info.component.html',
  styleUrls: ['./cards-info.component.css']
})
export class CardsInfoComponent implements OnInit {

  constructor( private userService : UsersService ) { }
  covid:any=[];
  technology:any=[];
  economia:any=[];
  loading:boolean=true;


  ngOnInit(): void {
  	this.userService.getNotices('covid')
  	.subscribe(data=> {
  		this.covid = data.articles.slice(0,4);
  		this.technology = data.articles.slice(4,8);
  		this.economia = data.articles.slice(8,12);
      this.loading=false;
  	})
  }

}
