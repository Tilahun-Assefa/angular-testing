import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'dl-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id: string;
  album: object;

  constructor(private spotify: SpotifyService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'] || '';
    });
  }

  ngOnInit(): void {
    this.spotify.getArtist(this.id)
      .subscribe(res => {
        this.renderAlbum(res);
      });
  }

  renderAlbum(res: any): void {
    this.album = null;
    if (res) {
      this.album = res;
    }
  }

}
