import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AppSettings } from 'src/app/app.settings';
import { Dictionary } from 'src/app/Models/Dictionary';
import { PageInfo } from 'src/app/Models/PageInfo';
import { User } from 'src/app/Models/User';
import { AuthenticationService } from '../Authtication/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class UIService {

	//loading
	loadingIngredients = true;
	loadingPantryItems = true; 


	public isUserLoggedIn: boolean = false;
	//main areas


	private _pages: Dictionary<PageInfo> = {
		"login_page": { Title: AppSettings.LoginPageTitle, Visible: false },
		"registration_page": { Title: AppSettings.RegisterPageTitle, Visible: false },
		"home_page": { Title: AppSettings.HomeTitle, Visible: false },
		"admin": { Title: "Admin", Visible: false }
	};

	private _areas: Dictionary<boolean> = {
		"recipes": true,
		"add_recipes": false,
		"pantry": false,
	}



	constructor(private auth: AuthenticationService, private titleService: Title) {


		//check if user is still logged in and has a valid token
		if (this.auth.currentUserValue !== null && new Date(this.auth.currentUserValue.token.expires) < new Date()) {
			//token is expired
			this.auth.LogOut();

		}

		this.isUserLoggedIn = !!auth.currentUserValue;
console.log("...", this.isUserLoggedIn)
		if (!this.isUserLoggedIn) {
			//user isn't logged in
			this.setPage("login_page");

		} else {
			this.setPage("home_page")

		}

	}


	//if everything is done load return true
	public doneLoadingEverything(): boolean{
		return !this.loadingIngredients && !this.loadingPantryItems; 
	}



	public setPage(pageToShow: string = ""): void {


		Object.entries(this._pages).forEach(([key, value]) => {
			if (pageToShow === key) {
				this.titleService.setTitle(this._pages[key].Title);
				this._pages[key].Visible = true;
			} else {
				this._pages[key].Visible = false;
			}

		});
	}

	public pageStatus(page: string): boolean {
		//Nullish Coalescing
		//return this._pages[page].Visible ?? false; 

		if (!this._pages[page]) {
			return false;
		}
		return this._pages[page].Visible;


	}



	//areas
	public setArea(areaToShow: string = ""): void {
		Object.entries(this._areas).forEach(([key]) => {
			if (areaToShow === key) {
				this._areas[key] = true;
			} else {
				this._areas[key] = false;
			}

		});
	}

	public getArea(key: string): boolean {
		return this._areas[key] ?? false;
	}


}
