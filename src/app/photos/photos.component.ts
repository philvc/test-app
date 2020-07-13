// modules
import { Component, OnInit } from '@angular/core';

// service
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  urls = [];
  constructor(
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.getPhotos()
  }

  getPhotos() {
    this.photoService.getImagesUrl().subscribe(data => {
      return this.urls = data.urls.map(url => {
        return `http://localhost:3000/api/image/${url}`
      })
    })
  }

}
