import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Subject } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { ErrorMessage } from 'src/app/dto/errorMessageDTO';
import { User } from 'src/app/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = AppSettings.GetAPI() + AppSettings.API_User;  
  private user: User|null = null; 

  constructor(private http: HttpClient) { }

  public getUser(){
    
    return this.http.get<User>(this.url); 

    // this.http.get<UserDTO>(this.url).subscribe({
    //   next: res => {
    //     this.user = new User(res.Username, res.FirstName, res.LastLoggedIn, res.FamilyName, res.Created, res.Title); 

    //     observer.next(this.user); 
    //   },
    //   error: error => {
    //     errorObserver.next(error); 
    //     //Todo: this
    //   },

    //   complete: () => {}
    // })
  }
}
