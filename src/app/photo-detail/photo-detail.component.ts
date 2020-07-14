import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// service
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  index;
  url;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private photoService: PhotoService,
  ) { }

  ngOnInit(): void {

    this.getPhotoByIndex()
  }

  getPhotoByIndex() {

    this.index = this.route.snapshot.paramMap.get('id')

    this.photoService.getImagesUrl().subscribe(data => {

      const selectedImage = data.urls[this.index]

      return this.url = `http://localhost:3000/api/image/${selectedImage}`

    })
  }

}
