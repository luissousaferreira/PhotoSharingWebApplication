import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Photo } from '../photo';
import { User } from '../user';
import { Location } from '@angular/common';
import { PhotoService } from '../photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favphotos',
  templateUrl: './favphotos.component.html',
  styleUrls: ['./favphotos.component.css']
})
export class FavphotosComponent implements OnInit {

  currentUser: User;
  favPhotos: Photo[] = [];

  constructor(private userService: UserService,
    private location: Location,
    private photoService: PhotoService,
    private router: Router) { }

  ngOnInit() {
    const currentUserID = sessionStorage.getItem('id');

    if (currentUserID === null) {
      this.router.navigate(['/home/dashboard']);
    }

    this.userService.getUser(currentUserID)
      .subscribe(user => {
        this.currentUser = user;
        this.setFavPhotos();
      });
  }

  setFavPhotos() {
    this.favPhotos = this.currentUser.favoritePhotos;
  }

}
