import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { Recipe } from 'src/app/Models/Recipe';
import { RecipeShort } from 'src/app/Models/RecipeShorts';
import { UIService } from '../UI/ui.service';

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	private endPoint = AppSettings.GetAPI(); 
	
	constructor(private http: HttpClient, private ui: UIService) { }

	public createRecipe(recipe: Recipe ){
		return this.http.post(this.endPoint + AppSettings.API_AddRecipe, recipe); 

	}

	public getRecipesByFamilyId(id: number){
		return this.http.get<Recipe[]>(this.endPoint + AppSettings.API_GetRecipes + `${id}`); 
	}

	public getRecipeShorts(id:number){
		return this.http.get<RecipeShort[]>(this.endPoint + AppSettings.API_GetRecipeShorts + `${id}`); 
	}

}
