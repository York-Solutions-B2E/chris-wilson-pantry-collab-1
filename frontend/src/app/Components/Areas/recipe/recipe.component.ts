import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreIngredient } from 'src/app/Models/CoreIngredient';


import { Recipe } from 'src/app/Models/Recipe';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { IngredientService } from 'src/app/Services/Ingredients/ingredient.service';
import { RecipeService } from 'src/app/Services/Recipe/recipe.service';
import { RecipeHandlerService } from 'src/app/Services/RecipeHandler/recipe-handler.service';
import { UIService } from 'src/app/Services/UI/ui.service';

@Component({
	selector: 'app-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {

	public recipe: Recipe | null = null;
	public ingredients: CoreIngredient[] = []; 

	constructor(
		public ui: UIService,
		public IngredientService: IngredientService,
		private recipeService: RecipeService,
		private auth: AuthenticationService,
		private recipeHandler: RecipeHandlerService,
		private router: Router,
	) {

	}

	ngOnInit(): void {
		if (this.recipeHandler.recipeHolder === null) {
			this.router.navigate([""]) 
		}else{
			this.recipe = this.recipeHandler.recipeHolder; 
			//this.recipeHandler.recipeHolder = null; 

			this.ingredients = this.IngredientService.GetIngredients; 
		}
	}
	ngOnDestroy(): void {

	}

	getIngredientName(id: number){
		return this.ingredients.find(x => x.id == id)?.name; 
	}

}
