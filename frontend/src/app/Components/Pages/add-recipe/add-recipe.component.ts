import { Component, OnInit } from '@angular/core';
import { Subscription, Subject, first, debounceTime } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';

import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { IngredientService } from 'src/app/Services/Ingredients/ingredient.service';
import { RecipeService } from 'src/app/Services/Recipe/recipe.service';
import { UIService } from 'src/app/Services/UI/ui.service';
import {MatDialog} from '@angular/material/dialog';
import { AddIngredientDialogComponent } from '../../add-ingredient-dialog/add-ingredient-dialog.component';
import { CoreIngredient } from 'src/app/Models/CoreIngredient';
import { RecipeIngredient } from 'src/app/Models/RecipeIngredient';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  public ingredientsList: CoreIngredient[] = [];
  public selectedIngredient: any; 
  public ingredientAmount: number|null = null; 

	private ingSub: Subscription | null = null; 
	public recipeName = "";



	public Ingredients: RecipeIngredient[] = [];

	public amountToAdd: number = 0;
	public selectedItem: number = 0;

	public directions = "";

	public redditResults: any[] = [];
	private modelChanged: Subject<string> = new Subject<string>();
	private subscription: Subscription | null = null;
	private debounceTime = 1000; //wait for a second

	public ingredients: any[] = [];

	//ui 
	public isLoading = true; 

	constructor(
		public ui: UIService, 
		public IngredientService: IngredientService, 
		private recipeService: RecipeService, 
		private auth: AuthenticationService,
		private dialog: MatDialog, 
		private ingredientService: IngredientService,
		public router: Router,
		) {

	}



	public onSelected(id: string) {
		this.selectedItem = parseInt(id);
	}

	public addIngredient(){
		this.ingredients.push({
			ingredientId: this.selectedIngredient.id,
			name: this.selectedIngredient.name,
			amount: this.ingredientAmount
		});

		//reset
		this.selectedIngredient = null; 
		this.ingredientAmount = null; 

	}




	public save() { 
		this.isLoading = true; 
console.log("saving")
		if(this.auth.currentUserValue){//have to check for this to be happy
			
			this.recipeService.createRecipe({
			id: 0, 
			name: this.recipeName, 
			description: "", 
			servings:0, 
			directions: this.directions, 
			family: this.auth.currentUserValue.familyId, 
			ingredients: this.Ingredients, 
			relationship: 0
		}).pipe(first()).subscribe({
			next: response => {
				this.isLoading = false; 
				console.log(response); 
				//Todo: add navigation redirect
				let navigationExtras: NavigationExtras = {
					queryParams: {
					  familyId: this.auth.currentUserValue?.familyId,
					}
				  };
				  this.router.navigate(['/family'], navigationExtras);
			},
			error: err => console.error(err)
		})
		}
		
	}

	
	

	ngOnInit(): void {
		// this.ingSub = this.IngredientService.Ingredients.subscribe(response => {
		// 	this.ingredientsList = response
		// 	//this.isLoading = false; 
		// });
		this.ingredientsList = this.IngredientService.GetIngredients; 
		console.log(this.ingredientsList)
		this.isLoading = false; 

		this.subscription = this.modelChanged
			.pipe(
				debounceTime(this.debounceTime), //wait 
			)
			.subscribe(() => {
				//console.log("searching for: ", this.recipeName.split(" "))
				this.searchReddit(this.recipeName.split(" "));
			});

			//this.ingredients = [{ name: '', amount: '' }];
	}

	inputChanged() {
		
		this.modelChanged.next("")
	}

	ngOnDestroy(): void {
		this.ingSub?.unsubscribe(); 
		this.subscription?.unsubscribe();
	}

	//todo: move this to a service
	public searchReddit(terms: string[]) {
		let searchTerm = "";
		terms.forEach(x => { searchTerm += `,${x}` })

		//could not get this to work 
		//it kept giving me CORS errors 
		//reddit doesn't use CORS so I don't know what the problem is
		//fetch worked

		//https://www.reddit.com/r/recipes/search?q=potatoes%20dog&restrict_sr=on&include_over_18=on&sort=relevance&t=all
		// this.http.get(`https://api.reddit.com/r/recipes/search.json?q=${searchTerm}&sort=relevance&limit=15`).subscribe({
		// this.http.get(`https://api.reddit.com/r/popular.json`).subscribe({
		// 	next: response => {
		// 		console.log(response); 
		// 	}, 
		// 	error: err => console.log(err), 
		// }); 


		//&restrict_sr=on is needed to keep the search to recipies
		fetch(`https://api.reddit.com/r/recipes/search.json?q=${searchTerm}&sort=relevance&limit=15&restrict_sr=on`)
			.then((response) => response.json())
			.then((data) => {
				//console.log(data)

				this.redditResults = data.data.children;

				console.log(this.redditResults)

			});

	}

	public deleteIngredient(id: number){
		console.log(id)
		this.ingredients = this.ingredients.filter(ingredient => ingredient.ingredientId !== id);
		console.log(this.ingredients) ;
	}
}
