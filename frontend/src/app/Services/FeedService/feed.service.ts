import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { Feed } from 'src/app/Models/Feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  

  constructor(private http: HttpClient) { }

  //generate a feed

  //https://localhost:7103/api/Feed

  public getFeeds(): Observable<Feed[]>{
    return this.http.get<Feed[]>(AppSettings.GetAPI() + AppSettings.API_Feed)
  }

}
