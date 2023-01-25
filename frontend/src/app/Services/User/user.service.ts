import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Subject } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { ErrorMessage } from 'src/app/dto/errorMessageDTO';
import { NewUserDTO } from 'src/app/dto/NewUserDTO';
import { User } from 'src/app/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = AppSettings.GetAPI() + AppSettings.API_User;  
  private user: User|null = null; 

  constructor(private http: HttpClient) { }

  public createUser(userData: NewUserDTO){
    return this.http.post(AppSettings.GetAPI() + AppSettings.API_CreateUser, userData); 
  }
}
