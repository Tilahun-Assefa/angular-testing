import { Component, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, fromEvent, Subject, EMPTY } from 'rxjs';
import { debounceTime, filter, map, switchAll, tap } from 'rxjs/operators';
import { SearchResult } from '../search-result';
import { SearchService } from '../search-service';

@Component({
  selector: 'dl-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  //define observable string for error message stream
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtubeSearchService: SearchService, private elem: ElementRef) { }

  ngOnInit(): void {
    //convert the "keyup" event into an observable stream
    const click$ = fromEvent(this.elem.nativeElement, 'keyup');

    click$.pipe(
      map((e: any) => e.target.value),
      filter((text: string) => text.length > 3),
      debounceTime(250),
      tap(evt => console.log(`${evt} in search component`)),
      tap(() => this.loading.emit(true)),
      map((query: string) => this.youtubeSearchService.search(query)),
      switchAll()
    ).subscribe({
      next: (results: SearchResult[]) => {//on success
        this.loading.emit(false);
        this.results.emit(results)
      },     
      error: (err: any) => {//on error
        console.log('error',err);
        this.errorMessageSubject.next(err)
        this.loading.emit(false)
        return EMPTY;
      },
      complete: () => {//one completion
        this.loading.emit(false);
      }
    });
  }
}


