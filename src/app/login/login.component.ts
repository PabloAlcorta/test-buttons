import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
  	private userService: UsersService,
  	public fb: FormBuilder
  ) { 
  	this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
    });
  }

  loading:boolean=false;

  ngOnInit(): void {
  }

  login() {
  	this.loading = true;
  	this.userService.getUsers()
  	.subscribe(data=>{
  		let users:any=[];
  		users=data;
  		console.log(data);
  		let i = users.findIndex((u:any) => (
  		  u.username == this.loginForm.value.username && 
  		  u.email == this.loginForm.value.email
  		));
  		console.log(i);
  		if (i!=-1)
  		  sessionStorage.setItem('user',JSON.stringify(users[i]));
  	})
  }

}
