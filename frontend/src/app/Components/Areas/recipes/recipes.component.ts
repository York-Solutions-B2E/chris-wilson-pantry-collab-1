import { Component } from '@angular/core';
import { RecipeCard } from 'src/app/Models/RecipeCard';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {

	public recipies: RecipeCard[] = []; 

	constructor() {

	}
}
