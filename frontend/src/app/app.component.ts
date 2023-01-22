import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from './app.settings';
import { AuthenticationService } from './Services/Authtication/authentication.service';
import { UIService } from './Services/UI/ui.service';
import { UserService } from './Services/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthenticationService, private userService: UserService, private titleService: Title, public ui: UIService ){
    
    titleService.setTitle(AppSettings.Title); 

   
    console.log("login: ", ui.pageStatus('login_page')); 
    

    
    
  }
}
 