import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { first } from 'rxjs';
import { AppSettings } from './app.settings';
import { AuthenticationService } from './Services/Authtication/authentication.service';
import { IngredientService } from './Services/Ingredients/ingredient.service';
import { PantryService } from './Services/Pantry/pantry.service';
import { RedditService } from './Services/reddit/reddit.service';
import { UIService } from './Services/UI/ui.service';
import { UserService } from './Services/User/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	public isLoading = true; 

	constructor(
		public auth: AuthenticationService, 
		public ui: UIService, 
		public pantryService: PantryService,
		public IngredientService: IngredientService,
		public redditService: RedditService
		) {
			//redditService.getNewestRecipePosts();

		//check if user is still logged in and has a valid token
		if (this.auth.currentUserValue !== null && new Date(this.auth.currentUserValue.token.expires) < new Date()) {
			//token is expired
			this.auth.LogOut();

		}

		
		
		
	}
	ngOnInit(): void {

		this.IngredientService.loadIngredients().pipe(
			first()//there should only be one response
		).subscribe({
			next: response => {
				console.log("got list ", response);
				this.IngredientService.Ingredients.next(response); 


				//done loading the ingredients
				this.ui.loadingIngredients = false;
				
				this.isLoading = false; 


			},

			error: err => {
				
			}

		});
		
		// if(this.ui.isUserLoggedIn){
		// 	if(this.auth.currentUserValue !== null){
		// 		this.pantryService.inti(this.auth.currentUserValue?.familyId);
		// 	} 
		// }
	}
}
