import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
  	return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getNotices(param:string):Observable<any> {
  	return this.http.get<any>('http://newsapi.org/v2/everything?q=`${param}`&from=2021-09-28&sortBy=publishedAt&Language=en&apiKey=1b42c67c843f4413b5f50e4f91d40b38')
  }
}
