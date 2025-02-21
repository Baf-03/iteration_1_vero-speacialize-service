import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LocalStorageService {
  constructor(private router: Router) {}

  loginUser(userObj: any) {
    localStorage.setItem('user', JSON.stringify(userObj));
    localStorage.setItem('token', 'Bearer ' + userObj.accessToken);
  }

  logoutUser() {
    localStorage.clear();
    window.location.reload();
  }

  getUser() {
    const user: any = localStorage.getItem('user');
    if (user) {
      const d = JSON.parse(user.user || user);
      return d.user || d;
    }
    return null;
  }

  getToken() {
    const u = localStorage.getItem('token');
    return u || '';
  }
}
