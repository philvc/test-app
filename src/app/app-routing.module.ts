import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { PhotosComponent } from './photos/photos.component';

const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: 'detail/:id', component: PhotoDetailComponent },
  { path: '', redirectTo: '/photos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
