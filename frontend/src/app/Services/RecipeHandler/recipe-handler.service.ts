import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/Models/Recipe';

@Injectable({
	providedIn: 'root'
})
export class RecipeHandlerService {

	public recipeHolder: Recipe | null = null; 

	constructor() { }
}
