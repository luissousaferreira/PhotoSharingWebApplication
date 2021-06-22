import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  users: User[];

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }


  register(userName: string, password: string) {
    if (!userName) {
      return;
    }

    // check username length
    if (userName.length < 3) {
      window.alert('Username tem de ter pelo menos 3 caracteres');
      return;
    }

    // check username characters
    const usernameRegex = new RegExp('(?=.[A-Za-z0-9])');

    if (!usernameRegex.test(userName)) {
      window.alert('Username só pode conter letras ou algarismos!');
      return;
    }

    // check password lower case
    const lowerRegex = new RegExp('.*[a-z]');
    if (!lowerRegex.test(password)) {
      window.alert('Password não contém letras minúsculas');
      return;
    }

    // check password upper case
    const upperRegex = new RegExp('.*[A-Z]');
    if (!upperRegex.test(password)) {
      window.alert('Password não contém letras maiúsculas');
      return;
    }

    // check password numbers
    const numberRegex = new RegExp('.*[0-9]');
    if (!numberRegex.test(password)) {
      window.alert('Password não contém números');
      return;
    }

    // check password length
    if (password.length < 8) {
      window.alert('Password tem de ter pelo menos 8 caracteres');
      return;
    }

    let result = true;

    this.users.forEach((user) => {
      if (user.userName === userName) {
        result = false;
      }
    });

    if (result) {
      let id: string;
      this.userService.addUser({ userName, password } as User)
        .subscribe(user => {
          this.users.push(user);
          id = user._id;
          sessionStorage.setItem('id', id);
          window.alert('Registado com sucesso! Vai ser redirecionado!');
          this.router.navigate(['/home/dashboard']);
        });
    } else {
      window.alert('Username já existe');
    }
  }
}
