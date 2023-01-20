import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { UserDTO } from 'src/app/dto/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = AppSettings.GetAPI() + AppSettings.API_User;  

  constructor(private http: HttpClient) { }

  public getUser(){

    this.http.get<UserDTO>(this.url).subscribe({
      next: res => {
        console.log(res)
      }
    })
  }
}
