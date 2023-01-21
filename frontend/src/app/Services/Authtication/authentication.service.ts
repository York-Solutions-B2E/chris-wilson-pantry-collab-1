import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app.settings';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'src/app/Models/User';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private endPoint = AppSettings.API_Endpoint + ":" + AppSettings.API_Port + AppSettings.API_LoginEndPoint; 
	private currentUserSubject: BehaviorSubject<User|null>;
	
	constructor(private http: HttpClient) { 
		
		this.currentUserSubject = new BehaviorSubject<User|null>(null);

		let test = localStorage.getItem('currentUser'); 

		if(test != null){
			this.currentUserSubject.next(JSON.parse(test)); 
		}
	}

	login(username: string, password: string):Observable<User>{
		
		console.log("logging in..."); 
		return this.http.post<User>(this.endPoint, {username, password} ).pipe(
			map(response => {
				//save current user 
				localStorage.setItem('currentUser', JSON.stringify(response)); 
				this.currentUserSubject.next(response); 
				return response; 
			})
		);
	}


	public LogOut() {
		localStorage.removeItem("currentUser");
	}

	public get currentUserValue(): User|null {

        return this.currentUserSubject.value;
    }

	public IsLoggedIn(): boolean {
		let user = this.currentUserValue; 

		if(user){
			if(user.Token && user.Token.Expires < new Date()){
				return true; 
			}
		}
		return false; 

	}
}
