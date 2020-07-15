import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns'

// service
import { PhotoService } from '../photo.service';

declare var EXIF: any;

interface Coordonates {
  lat: number,
  lng: number,
}

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
  coordonates: Coordonates = {
    lat: null,
    lng: null,
  };
  dateAndTime;


  constructor(
    private route: ActivatedRoute,
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

    if (allMetaData.GPSLatitude) {
      const latitudeDD = this.convertDMSToDD(
        allMetaData.GPSLatitude[0].valueOf(),
        allMetaData.GPSLatitude[1].valueOf(),
        allMetaData.GPSLatitude[2].valueOf(),
        allMetaData.GPSLatitudeRef
      )

      const longitudeDD = this.convertDMSToDD(
        allMetaData.GPSLongitude[0].valueOf(),
        allMetaData.GPSLongitude[1].valueOf(),
        allMetaData.GPSLongitude[2].valueOf(),
        allMetaData.GPSLongitudeRef
      )
      this.coordonates.lat = latitudeDD;
      this.coordonates.lng = longitudeDD;
    }

    if (allMetaData.DateTime) {

      const date = allMetaData.DateTime.split(' ')[0].split(':')
      const hour = allMetaData.DateTime.split(' ')[1]
      const formattedDate = format(new Date(date[0], date[1] - 1, date[2]), 'MM/dd/yyyy')

      this.dateAndTime = `Date: ${formattedDate} Heure: ${hour}`

    } else {

      this.dateAndTime = "no details"

    }

  }


  private convertDMSToDD(degrees, minutes, seconds, direction) {

    var dd = degrees + minutes / 60 + seconds / (60 * 60);
    if (direction == "S" || direction == "W") {
      dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
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
