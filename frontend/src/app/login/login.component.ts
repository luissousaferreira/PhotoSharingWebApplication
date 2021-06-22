import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
    sessionStorage.clear();
  }

  login(userName: string, password: string) {
    let result = false;
    let id = '';
    let newUser: User;
    this.users.forEach((user) => {
      if (user.userName === userName && user.password === password) {
        id = user._id;
        result = true;
        newUser = user;
      }
    });

    if (result) {
      sessionStorage.setItem('id', id);
      if (newUser.uploadedPhotos.length !== 0) {
        this.router.navigate(['/home/myphotos']);
      } else {
        this.router.navigate(['/home/dashboard']);
      }
    } else {
      window.alert('Autenticação falhou!');
    }
  }
}
