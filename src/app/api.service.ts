import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';

interface users {
  pagination: any;
  list: any;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  url = 'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user';
  usersNum: number = 20;
  currentPage: number = 1;
  pagesToLoad: boolean = true;
  currentFriendsPage: number = 1;
  friendsPagesToLoad: boolean = true;

  getAllusers() {
    return this.http.get(`${this.url}/${this.currentPage}/${this.usersNum}`);
  }
  getUser(id: any) {
    return this.http.get(`${this.url}/${id}`);
  }
  getFriends(id: any) {
    return this.http.get(
      `${this.url}/${id}/friends/${this.currentFriendsPage}/${this.usersNum}`
    );
  }
}
