import { NgModule } from '@angular/core';
import { YOUTUBE_API_KEY, YOUTUBE_API_URL } from "./search.injectable";
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultComponent } from './search-result/search-result.component'
import { Route, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { SearchFormComponent } from './search-form.component';
import { SearchService } from './search-service';
import { environment } from 'src/environments/environment';

const routes: Route[] = [
  { path: '', component: SearchFormComponent }
];

@NgModule({
  declarations: [
    SearchFormComponent,
    SearchBoxComponent,
    SearchResultComponent
  ],
  imports: [
    SharedModule, RouterModule.forChild(routes), AngularMaterialModule
  ],
  exports:[SearchFormComponent],
  providers: [
    { provide: SearchService, useClass: SearchService },
    { provide: YOUTUBE_API_KEY, useValue: environment.youtubeApiKey },
    { provide: YOUTUBE_API_URL, useValue: environment.youtubeApiUrl }]
})
export class SearchModule { }




