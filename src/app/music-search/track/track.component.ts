import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'dl-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  id: string;
  track: object;

  constructor(private spotify: SpotifyService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.spotify.getTrack(this.id)
      .subscribe(res => {
        this.renderTrack(res);
      });
  }

  renderTrack(res: any): void {
    this.track = null;
    if (res) {
      this.track = res;
    }
  }

}
