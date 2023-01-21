import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from './app.settings';
import { AuthenticationService } from './Services/Authtication/authentication.service';
import { UserService } from './Services/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthenticationService, private userService: UserService, private titleService: Title ){
    
    titleService.setTitle(AppSettings.Title); 

    // if(!auth.IsLoggedIn()){
    //   console.log("not logged in"); 
    //   auth.login("gravy", "string"); 
    // }

    // userService.getUser(); 

    //auth.LogOut(); 
    

    
    
  }
}
 