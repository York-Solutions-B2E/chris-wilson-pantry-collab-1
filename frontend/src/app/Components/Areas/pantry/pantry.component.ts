import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CoreIngredient } from 'src/app/Models/CoreIngredient';

import { Pantry } from 'src/app/Models/Pantry';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { IngredientService } from 'src/app/Services/Ingredients/ingredient.service';
import { PantryService } from 'src/app/Services/Pantry/pantry.service';
import { RecipeService } from 'src/app/Services/Recipe/recipe.service';
import { UIService } from 'src/app/Services/UI/ui.service';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit, OnDestroy{

  public pantryItems: Pantry[] = []; 
  public ingredients: CoreIngredient[] = []; 

  constructor(
		public ui: UIService, 
		public IngredientService: IngredientService, 
		private pantryService: PantryService, 
		private auth: AuthenticationService
		) {}


  ngOnInit(): void {
    if(this.auth.currentUserValue?.familyId){
      this.pantryService.getPantryItems(this.auth.currentUserValue?.familyId).pipe(first()).subscribe({
        next: response => {this.pantryItems = response},
        error: err => {
          //TODO: tell the user 
          console.error(err);
        } 
    });
    }
     
    this.ingredients = this.IngredientService.GetIngredients;
  }


  ngOnDestroy(): void {
    
    
  }

  getIngredientName(id: number){
		return this.ingredients.find(x => x.id == id)?.name; 
	}


}
