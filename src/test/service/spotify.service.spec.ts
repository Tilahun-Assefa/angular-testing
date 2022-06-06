import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpBackend, HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { SpotifyService } from 'src/app/music-search/spotify.service';
import { _resolveDirectionality } from '@angular/cdk/bidi/directionality';

describe('SpotifyService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpotifyService]
    });
    // httpClient = TestBed.inject(HttpClient);
    // httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created outside', () => {
    expect(true).toBeTruthy();
  });

  it('retrieves using the track-id', fakeAsync(inject([SpotifyService, HttpTestingController],
    (spotify: SpotifyService, mockBackend: HttpTestingController) => {
      const postItem = [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
          "userId": 1,
          "id": 3,
          "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        }
      ];
      spotify.getTrack('TRACK_ID').subscribe((data) => {
        expect(data.length).toBe(3);
      });

      // let res = new HttpResponse({ body: '{"name":"Til"}' });
      
      let req = mockBackend.expectOne("https://api.spotify.com/v1/tracks/TRACK_ID");
      expect(req.request.method).toBe('GET');
      tick(5000);
      req.flush(postItem);
      mockBackend.verify();
     
      // expect(res.url).toBe("Til");
    })
  ));
});

describe('this test', () => {
  it('looks async but is synchronous', <any>fakeAsync((): void => {
       let flag = false;
       setTimeout(() => {
         flag = true;
       }, 90);
       expect(flag).toBe(false);
       tick(50);
       expect(flag).toBe(false);
       tick(50);
       expect(flag).toBe(true);
     }));
});
