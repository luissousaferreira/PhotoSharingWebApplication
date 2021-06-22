import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  photosRecent: Photo[];
  photosLiked: Photo[];

  selectedPhotos: Photo[];

  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {
    this.photoService.getRecentPhotos()
      .subscribe(photo => {
        this.photosRecent = photo;
        this.selectedPhotos = this.photosRecent;
      });

    this.photoService.getLikedPhotos()
      .subscribe(photo => {
        this.photosLiked = photo;
      });
  }

  setSelected(option: string) {
    if (option === 'date') {
      this.selectedPhotos = this.photosRecent;
    } else if (option === 'likes') {
      this.selectedPhotos = this.photosLiked;
    }
  }
}
