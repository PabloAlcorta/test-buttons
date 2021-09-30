import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
  	private userService: UsersService,
  	public fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
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
  		if (i!=-1) {
  		  localStorage.setItem('user',JSON.stringify(users[i]));
        this.router.navigate(['']);
      }
      else
        this.snackBar.open('Usuario o email incorrecto', 'Close', {
          duration: 2500
        });
  	})
  }

}
