import { Component, OnDestroy, OnInit } from '@angular/core';
import { IngreDTO } from 'src/app/dto/IngreDTO';
import { Ingredients } from 'src/app/Models/Ingredients';
import { Recipe } from 'src/app/Models/Recipe';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { IngredService } from 'src/app/Services/Ingredients/ingred.service';
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
	public ingredients: IngreDTO[] = []; 

	constructor(
		public ui: UIService,
		public IngreService: IngredService,
		private recipeService: RecipeService,
		private auth: AuthenticationService,
		private recipeHandler: RecipeHandlerService,
	) {

	}

	ngOnInit(): void {
		if (this.recipeHandler.recipeHolder === null) {
			this.ui.setArea("recipes"); 
		}else{
			this.recipe = this.recipeHandler.recipeHolder; 
			//this.recipeHandler.recipeHolder = null; 

			this.ingredients = this.IngreService.GetIngredients; 
		}
	}
	ngOnDestroy(): void {

	}

	getIngredientName(id: number){
		return this.ingredients.find(x => x.id == id)?.name; 
	}

}
