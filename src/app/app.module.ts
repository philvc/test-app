// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps'


// components
import { AppComponent } from './app.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoDetailComponent,
    PhotosComponent,
    PhotoUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
