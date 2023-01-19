import { Injectable } from '@angular/core';
import { TokenDTO } from 'src/app/dto/TokenDTO';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app.settings';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private endPoint = AppSettings.API_Endpoint + ":" + AppSettings.API_Port + AppSettings.API_LoginEndPoint; 

	constructor(private http: HttpClient) { }

	login(email: string, password: string){
		console.log("logging in..."); 
		this.http.post<TokenDTO>(this.endPoint, {email, password} ).subscribe({
			next: token => this.SetSession(token), 
			error: err => console.log(err), 
			complete: () => {}
		}); 
	}

	public SetSession(t: TokenDTO) {
		console.log("logged in : ");
		console.log(t);  
		localStorage.setItem("token", t.token);
		localStorage.setItem("token_exp", t.expires);
	}

	public LogOut() {
		localStorage.removeItem("token");
		localStorage.removeItem("token_exp");
	}

	public IsLoggedIn(): boolean {
		//get date from local storage 
		let expireDate = localStorage.getItem("token_exp"); 

		//check to is its null 
		if(expireDate === null){
			return false;  
		}

		//turn it into a time object
		let time = new Date(expireDate); 

		//check if its in the past
		if(time < new Date()){
			return false; 
		}

		//its a real date, its not in the past, user is logged in 
		return true; 
	}

	public GetExpiration(): Date{
		//get date from local storage 
		let expireDate = localStorage.getItem("token_exp"); 

		//check to is its null 
		if(expireDate === null){
			//set way in the past
			return new Date(0); 
		}

		return new Date(expireDate); 
	}
}
