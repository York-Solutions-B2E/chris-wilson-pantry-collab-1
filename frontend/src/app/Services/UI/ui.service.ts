import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dictionary } from 'src/app/Models/Dictionary';
import { User } from 'src/app/Models/User';
import { AuthenticationService } from '../Authtication/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class UIService {

	public isUserLoggedIn:boolean = false; 
	private user:BehaviorSubject<User|null>; 
	//main areas


	private _pages:Dictionary<boolean> = {
		"login_page": false,
		"registration_page": false,
		"home_page": false
	}; 



	constructor(private auth: AuthenticationService) {
		this.user = auth.getUserSubject(); 
		this.isUserLoggedIn = !!auth.currentUserValue; 

		if(!this.isUserLoggedIn){
			//user isn't logged in
			this._pages['login_page'] = true; 

		}else{
			this._pages['home_page'] = true; 

		}


		// this.user.subscribe(response => {
		// 	if(response){

		// 	}
		// });  

	}

	public setPage(pageToShow: string = ""):void{


		Object.entries(this._pages).forEach(([key, value]) => {
			if(pageToShow === key){
				this._pages[key] = true; 
			}
			this._pages[key] = false; 
		});
	}

	public pageStatus(page: string):boolean{
		//Nullish Coalescing
		return this._pages[page] ?? false; 

		// if(!this._pages[page]){
		// 	return false; 
		// }
		// return true; 

	
	}





}
