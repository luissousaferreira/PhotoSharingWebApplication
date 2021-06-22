import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  isLoggedIn = true;

  constructor(private router: Router) {
  }

  ngOnInit() { 
    this.router.navigate(['/home/dashboard']);
    if (sessionStorage.getItem('id') === null) {
      this.isLoggedIn = false;
    }
  }

  logOut() {
    this.isLoggedIn = false;
    sessionStorage.removeItem('id');
    this.router.navigate(['/home/dashboard']);
  }
}
