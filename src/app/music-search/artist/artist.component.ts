import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'dl-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: object;

  constructor(private spotify: SpotifyService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'] || '';
    });
  }

  ngOnInit(): void {
    this.spotify.getArtist(this.id)
      .subscribe(res => {
        this.renderArtist(res);
      });
  }

  renderArtist(res: any): void {
    this.artist = null;
    if (res) {
      this.artist = res;
    }
  }

}
