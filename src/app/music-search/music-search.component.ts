import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'dl-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css']
})
export class MusicSearchComponent implements OnInit {
  query: string;
  results: object;

  constructor(private spotify: SpotifyService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
    });
  }

  ngOnInit(): void {
    this.search();
  }

  submit(newQuery: string):void {
    this.router.navigate(['music-search'], {queryParams:{query:newQuery}}).then(_ => this.search());
  }

  search(): void {
    console.log('this query ', this.query);
    if (!this.query) {
      return;
    }
    this.spotify.searchTrack(this.query).subscribe((res: any) => this.renderResults(res))
  }

  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }
}
