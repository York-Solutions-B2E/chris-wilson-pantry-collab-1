import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from './app.settings';
import { AuthenticationService } from './Services/Authtication/authentication.service';
import { IngredService } from './Services/Ingredients/ingred.service';
import { UIService } from './Services/UI/ui.service';
import { UserService } from './Services/User/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(public auth: AuthenticationService, public ui: UIService, public ingredients: IngredService) {
		
		
	}
}
