import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/login/login.component';
import { HomeComponent } from 'src/app/home/home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
