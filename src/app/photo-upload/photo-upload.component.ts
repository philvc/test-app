import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  uploadedFiles: Array<File>;
  alert: String;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {

  }

  upload(element) {

    this.alert = undefined;
    this.uploadedFiles = element.target.files;

    if (!this.uploadedFiles[0].type.includes('image')) {
      return this.alert = 'Ajoutez un fichier image png ou jpeg'
    }

    let formData = new FormData();

    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }

    this.http.post('http://localhost:3000/api/upload', formData)
      .subscribe((response) => {
        console.log('response received is ', response);
        this.router.navigate(['0'], { relativeTo: this.route })
      })
  }

}
