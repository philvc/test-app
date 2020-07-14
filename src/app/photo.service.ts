// modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {


  constructor(
    private http: HttpClient,
  ) { }

  getImagesUrl(): Observable<any> {
    const imagesUrl = 'http://localhost:3000/api/images'
    return this.http.get<any>(imagesUrl)
  }
}
