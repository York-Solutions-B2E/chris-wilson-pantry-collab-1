import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { Recipe } from 'src/app/Models/Recipe';
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

}
