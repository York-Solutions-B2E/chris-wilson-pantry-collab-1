import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, first, map, of } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { CoreIngredient } from 'src/app/Models/CoreIngredient';

import { UIService } from '../UI/ui.service';

@Injectable({
	providedIn: 'root'
})
export class IngredientService {
	public Ingredients: BehaviorSubject<CoreIngredient[]> = new BehaviorSubject<CoreIngredient[]>([]);

	public loading = false; 


	constructor(private http: HttpClient, private ui: UIService) {

	
	}

	public loadIngredients() {
		console.log("loading list");
		this.ui.loadingIngredients = true; 
		
		return this.http.get<CoreIngredient[]>(AppSettings.GetAPI() + AppSettings.API_GetIngredient)
	}

	public AddIngredient(ingredient: CoreIngredient) {
		return this.http.post<CoreIngredient>(AppSettings.GetAPI() + AppSettings.API_AddIngredient, ingredient).pipe(
			first(),
			map(response => {
				console.log(response);

				//add the new item to the list
				const currentValue = this.Ingredients.value;
				const newValue = [...currentValue, response];
				this.Ingredients.next(newValue);

				return response;
			})
		);
	}

	public get GetIngredients() {
		return this.Ingredients.value;
	}
}
