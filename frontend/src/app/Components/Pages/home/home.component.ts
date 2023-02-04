import { Component } from '@angular/core';
import { UIService } from 'src/app/Services/UI/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public ui:UIService){
    
  }
}
