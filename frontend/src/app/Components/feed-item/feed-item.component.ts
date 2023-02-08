import { Component, Input, OnInit } from '@angular/core';
import { Feed } from 'src/app/Models/Feed';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit {
  @Input() feedItem: Feed = {} as Feed;


  constructor(private router: Router) {}


  ngOnInit(){
    if(this.feedItem.comment === null){
      this.feedItem.comment = "It was Awesome!"
    }
  }

  public titleClick(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        familyId: this.feedItem.family.id,
      }
    };

    this.router.navigate(['/family'], navigationExtras);
  }
}
