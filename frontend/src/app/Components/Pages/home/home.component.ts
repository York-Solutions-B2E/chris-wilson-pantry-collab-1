import { Component, OnInit } from '@angular/core';
import { Feed } from 'src/app/Models/Feed';
import { FeedService } from 'src/app/Services/FeedService/feed.service';
import { UIService } from 'src/app/Services/UI/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public loading: boolean = false; 

  public feeds: Feed[] = []; 

  constructor(public ui:UIService, public feedService: FeedService){
    
  }
  ngOnInit(): void {
    
    this.feedService.getFeeds().subscribe({
      next: feeds => {
        console.log(feeds); 
        this.feeds = feeds; 
      }, 
      error: err => {
        console.error(err); 
      }
    }); 
  }


}
