import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Photo } from '../photo';
import { User } from '../user';
import { Location } from '@angular/common';
import { PhotoService } from '../photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myphotos',
  templateUrl: './myphotos.component.html',
  styleUrls: ['./myphotos.component.css']
})
export class MyphotosComponent implements OnInit {

  currentUser: User;
  myPhotos: Photo[] = [];
  imageSrc: string;
  file_name: string;
  array_photos: string[] = [];
  array_index: number = 0;
  array_name_Photos: string[] = [];

  constructor(private userService: UserService,
    private location: Location,
    private photoService: PhotoService,
    private router: Router) {
  }

  ngOnInit() {
    const currentUserID = sessionStorage.getItem('id');
    if (currentUserID === null) {
      this.router.navigate(['/home/dashboard']);
    }

    this.userService.getUser(currentUserID)
      .subscribe(user => {
        this.currentUser = user;
        this.setPhotos();
      });
    this.hideElements();
    var labels = document.getElementsByTagName('label');

    var elem_single = labels[0];
    var elem_multiple = labels[1];
    elem_single.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        document.getElementById('photo-image').click();
      }


    });

    elem_multiple.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        document.getElementById('folderpicker').click();
      }
    });
  }

  setPhotos() {
    this.myPhotos = this.currentUser.uploadedPhotos;
  }

  uploadPhoto(namePhoto: string, description: string): void {
    const user = this.currentUser._id;

    if (description.length === 0) {
      if (confirm('Pretende adicionar foto sem descriçao?')) {
        this.addNewPhoto(namePhoto, description, user);
        this.imageSrc = null;
        this.hideElements();
      }
    } else {
      this.addNewPhoto(namePhoto, description, user);
      this.imageSrc = null;
      this.hideElements();
    }
  }

  readURL(): void {
    this.showElements();
    const file1 = (event.target as HTMLInputElement).files;
    const file2 = (event.target as HTMLInputElement).files[0];
    if (file1 && file2) {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result as string;
      reader.readAsDataURL(file);
      this.file_name = file.name.split('.')[0];
    }
  }

  addNewPhoto(name: string, description: string, user: string) {

    if (name.length !== 0) {
      this.file_name = name;
    }
    const currentdate = new Date().toISOString();

    this.photoService.addPhoto({
      name: this.file_name, description, image: this.imageSrc,
      like: '0', user, date: currentdate.toString()
    } as Photo)
      .subscribe(photo => {
        this.myPhotos.push(photo);
        this.updateUserPhotos();
      },
        error => {
          console.log(error);
          window.alert('Erro de Armazenamento!');
        });
  }

  updateUserPhotos(): void {
    this.currentUser.uploadedPhotos = this.myPhotos;
    this.userService.updateUser(this.currentUser).subscribe();
  }


  getReadyForFolder(): void {

    this.imageSrc = null;
    this.hideElements();
    document.getElementById('photo-image-icon').style.display = "none";
    this.array_photos = [];
    let ul = document.getElementById("photosFolder");
    let files = (event.target as HTMLInputElement).files;

    if (files.length > 10) {
      this.forCycle(ul, files, 10);
    } else {
      this.forCycle(ul, files, files.length);

    }
    document.getElementById('upload_Photo_Multiple').style.visibility = 'visible';
  }

  forCycle(ul: HTMLElement, files: FileList, number: number): void {

    for (let i = 0; i < number; i++) {

      let item = document.createElement("li");

      let img = document.createElement("img");

      const file = (event.target as HTMLInputElement).files[i];
      const reader = new FileReader();
      reader.onload = e => {
        img.setAttribute("src", reader.result as string);
        this.array_photos[i] = img.src;
        item.appendChild(img);
        ul.appendChild(item);
      }
      reader.readAsDataURL(file);
      this.array_name_Photos[i] = file.name.split('.')[0];
    }
    document.getElementById('upload_Photo_Multiple').style.display = "block";
    document.getElementById("photosFolder").style.borderBottomColor = "black";
    document.getElementById("photosFolder").style.borderBottomWidth = "1px";
    document.getElementById("photosFolder").style.borderBottomStyle = "solid";


  }
  uploadSeveralPhoto(): void {
    if (confirm("Pretende adicionar descrição a cada fotografia?")) {
      this.hideList();
      this.imageSrc = this.array_photos[this.array_index];
      document.getElementById('upload_Photo_Single').style.display = "block";
      document.getElementById('description_Multiple').style.display = "block";
      document.getElementById('upload_Photo_Multiple').style.display = "none";
    } else {
      for (let i = 0; i < this.array_photos.length; i++) {
        this.addNewPhoto(this.array_photos[i], '', this.currentUser._id);
      }
    }
  }

  hideList(): void {
    document.getElementById('photosFolder').style.display = 'none';
    //document.getElementById('photo-image-icon').style.display = "block";
  }

  uploadPhotoSingle(description: string): void {
    const user = this.currentUser._id;

    this.addNewPhoto(this.array_name_Photos[this.array_index], description, user);
    if (this.array_index == this.array_photos.length) {
      this.imageSrc = null;
      this.hideElements();

    } else if (this.array_index < this.array_photos.length) {
      this.imageSrc = this.array_photos[this.array_index + 1];
      this.array_index = this.array_index + 1;
      if (this.array_index == this.array_photos.length) {
        this.imageSrc = null;
        this.hideElements();
        document.getElementById('photo-image-icon').style.display = "block";
      }
    } else {
      this.imageSrc = null;
      this.hideElements();
    }
  }

  showElements(): void {
    document.getElementById('upload_Photo').style.display = "block";
    document.getElementById('name').style.display = "block";
    document.getElementById('description').style.display = "block";
  }
  hideElements(): void {
    document.getElementById('upload_Photo_Multiple').style.display = "none";
    document.getElementById('upload_Photo_Single').style.display = "none";
    document.getElementById('name').style.display = "none";
    document.getElementById('description').style.display = "none";
    document.getElementById('description_Multiple').style.display = "none";
    document.getElementById('upload_Photo').style.display = "none";
  }
}
