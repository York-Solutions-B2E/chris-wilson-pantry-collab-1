import { Component } from '@angular/core';
import { AuthenticationService } from './Services/Authtication/authentication.service';
import { UserService } from './Services/User/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Family Recipies';

  constructor(private auth: AuthenticationService, private user: UserService){
    
    auth.login("gravy", "string"); 

    
    
  }
}
 