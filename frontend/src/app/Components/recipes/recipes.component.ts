import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Recipe } from 'src/app/Models/Recipe';
import { RecipeCard } from 'src/app/Models/RecipeCard';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { IngredientService } from 'src/app/Services/Ingredients/ingredient.service';
import { RecipeService } from 'src/app/Services/Recipe/recipe.service';
import { RecipeHandlerService } from 'src/app/Services/RecipeHandler/recipe-handler.service';
import { UIService } from 'src/app/Services/UI/ui.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

	
	public recipies: Recipe[] = []; 

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
		if(this.auth.currentUserValue){
			this.recipeService.getRecipesByFamilyId(this.auth.currentUserValue?.familyId).pipe(first()).subscribe({
				next: response => {
					console.log(response)
					this.recipies = response; 
				}, 
			});
		}
		
	}

	ngOnDestroy(): void {
		
	}

	public onClick(recipe: Recipe){
		this.recipeHandler.recipeHolder = recipe; 


		this.router.navigate([""])
	}
}
