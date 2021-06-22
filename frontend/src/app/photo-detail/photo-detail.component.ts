import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PhotoService } from '../photo.service';
import { Photo } from '../photo';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  photo: Photo;
  currentUser: User;
  id: string;
  imagePath: string;
  isLoggedIn = true;
  isOwner: boolean = false;
  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private photoService: PhotoService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get("id");
    this.photoService.getPhoto(id)
      .subscribe(photo => {
        this.photo = photo;
      });

    const currentUserID = sessionStorage.getItem('id');
    if (currentUserID === null) {
      this.isLoggedIn = false;
    }
    if (currentUserID != null) {
      this.userService.getUser(currentUserID)
        .subscribe(user => {
          this.currentUser = user;
          setTimeout(() => {
            this.checkIfOwner()
            if (this.isLoggedIn) {
              this.fillStar();
              this.fillHeart();
            }
          }, 400);
        });
    }
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  checkIfOwner() {
    if (this.currentUser._id === this.photo.user) {
      this.isOwner = true;
    }
  }

  copyLink() {
    var copyText = document.body.appendChild(document.createElement("input"));
    copyText.value = window.location.href;
    copyText.focus();
    copyText.select();

    document.execCommand("copy");
    copyText.parentNode.removeChild(copyText);
    alert("URL Copied!")
  }

  addFav() {

    if (this.currentUser != null && !this.currentUser.favoritePhotos.find(photo => photo._id === this.photo._id)) {
      this.currentUser.favoritePhotos.push(this.photo);
      this.userService.updateUser(this.currentUser).subscribe();
    } else {
      this.currentUser.favoritePhotos = this.currentUser.favoritePhotos.filter(photo => photo._id !== this.photo._id)
      this.userService.updateUser(this.currentUser).subscribe();
    }
    this.fillStar();
  }

  fillStar() {
    if (this.currentUser.favoritePhotos.find(photo => photo._id === this.photo._id)) {
      document.getElementById("iconFav").className = 'fa fa-star';
      document.getElementById("iconFav").style.color = 'yellow';
      /* Coloca o d no saved*/
      document.getElementById("saved").style.display = 'inline-block';
    } else {
      document.getElementById("iconFav").className = 'far fa-star';
      document.getElementById("iconFav").style.color = 'white';
      /* Tira o d no saved*/
      document.getElementById("saved").style.display = 'none';
    }
  }

  addLike() {
    if (!this.isLoggedIn) {
      alert("To like photos you must be logged In!");
    } else {
      if (this.currentUser != null && !this.currentUser.likedPhotos.find(photo => photo._id === this.photo._id)) {
        this.currentUser.likedPhotos.push(this.photo);
        this.userService.updateUser(this.currentUser).subscribe();
        // add like
        let likes = parseInt(this.photo.like) + 1;
        this.photo.like = likes.toString();
        this.photoService.updatePhoto(this.photo).subscribe();
      } else {
        this.currentUser.likedPhotos = this.currentUser.likedPhotos.filter(photo => photo._id !== this.photo._id)
        this.userService.updateUser(this.currentUser).subscribe();
        // remove like
        let likes = parseInt(this.photo.like) - 1;
        this.photo.like = likes.toString();
        this.photoService.updatePhoto(this.photo).subscribe();
      }
    }
    this.fillHeart();
  }

  fillHeart() {
    if (this.currentUser.likedPhotos.find(photo => photo._id === this.photo._id)) {
      document.getElementById("iconHeart").className = 'fa fa-heart';
      document.getElementById("iconHeart").style.color = '#FD1D1D';
    } else {
      document.getElementById("iconHeart").className = 'far fa-heart';
      document.getElementById("iconHeart").style.color = 'white';
    }
  }

  removePhoto() {
    if (this.isOwner) {
      if (confirm("Do you want to delete this photo?")) {
        this.users.forEach(user => {
          user.likedPhotos = user.likedPhotos.filter(photo => photo._id !== this.photo._id);
          user.favoritePhotos = user.favoritePhotos.filter(photo => photo._id !== this.photo._id);
          user.uploadedPhotos = user.uploadedPhotos.filter(photo => photo._id !== this.photo._id);

          this.userService.updateUser(user).subscribe();

          if (user._id === this.currentUser._id) {
            this.userService.getUser(user._id).subscribe(user => this.currentUser = user);
          }
          this.photoService.deletePhoto(this.photo._id).subscribe();
          setTimeout(() => {this.location.back()}, 1000);
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
