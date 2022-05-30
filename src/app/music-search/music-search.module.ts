import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { APP_BASE_HREF } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { MusicSearchComponent } from './music-search.component';
import { TrackComponent } from './track/track.component';



const routes: Route[] = [
  { path: '', component: MusicSearchComponent },
  { path: 'tracks/:id', component: TrackComponent },
  { path: 'artists/:id', component: ArtistComponent },
  { path: 'albums/:id', component: AlbumComponent }
];


@NgModule({
  declarations: [AlbumComponent, ArtistComponent, TrackComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes), AngularMaterialModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: APP_BASE_HREF }
  ]
})
export class MusicSearchModule { }
