import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchResult } from './search-result';
import { YOUTUBE_API_KEY, YOUTUBE_API_URL } from './search.injectable';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  //for ssving post , patch and delete function
  data: any;
  loading: boolean;

  constructor(private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string) { }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl).pipe
      (
        map(response => {
          return <any>response['items'].map(item => {
            console.log("raw item", item) //to debug the response
            return new SearchResult({
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails.high.url
            });
          });
        })
      );
  }

  makePost(): void {
    this.loading = true;
    this.http.post(this.apiUrl, JSON.stringify({ body: 'bar', title: 'zanac', userId: 1 }))
      .subscribe(res => {
        this.data = res;
        this.loading = false;
      });
  }

  makeDelete(): void {
    this.loading = true;
    this.http.delete(this.apiUrl + "/id")
      .subscribe(res => {
        this.data = res;
        this.loading = false;
      });
  }

  makeHeaders(): void {
    const myHeaders: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'ng-book' });
    const req = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts/1', { headers: myHeaders });

    this.http.request(req).subscribe(res =>{
      this.data= res['body'];
    });
  }
}
