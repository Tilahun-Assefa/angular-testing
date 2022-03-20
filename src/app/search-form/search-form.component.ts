import { Component, OnInit } from '@angular/core';
import { SearchResult } from './search-result';

@Component({
  selector: 'dl-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  results: SearchResult[];
  loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  updateResults(results: SearchResult[]): void{
    this.results = results;
    console.log("results", this.results);
  }
}
