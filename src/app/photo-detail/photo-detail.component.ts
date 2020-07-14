import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// service
import { PhotoService } from '../photo.service';

declare var EXIF: any;


@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  @ViewChildren('img') imgEl: QueryList<any>;

  private imageRef: ElementRef

  index;
  url;

  output;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private photoService: PhotoService,
  ) { }

  ngOnInit(): void {

    this.getPhotoByIndex()
  }

  ngAfterViewInit() {
    this.imgEl.changes.subscribe(comps => {
      this.imageRef = comps.first
      this.getExif(comps.first)
    })
  }

  private getExif(element) {
    let allMetaData: any;
    EXIF.getData(<HTMLImageElement>element.nativeElement, function () {
      // `this` is provided image, check with `console.log(this)`

      allMetaData = EXIF.getAllTags(this);
    });
    this.output = allMetaData.DateTime || "no details"
  }

  getPictureDetails() {
    this.getExif(this.imageRef)
  }

  getPhotoByIndex() {

    this.index = this.route.snapshot.paramMap.get('id')

    this.photoService.getImagesUrl().subscribe(data => {

      const selectedImage = data.urls[this.index]

      return this.url = `http://localhost:3000/api/image/${selectedImage}`

    })
  }

}
