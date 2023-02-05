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





	constructor(private auth: AuthenticationService, private titleService: Title) {


		

		this.isUserLoggedIn = !!auth.currentUserValue;



	}











}
