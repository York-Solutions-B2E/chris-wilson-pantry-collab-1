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



	constructor(private http: HttpClient, private ui: UIService) {

		//get the ingredients 
		//this needs to only happen once so do it in the constructor 
		// this.http.get<Ingredient[]>(this.endPoint + AppSettings.API_GetIngredient).pipe(
		// 	first(),
		// 	map(response => {
		// 		console.log(response);
		// 		this.Ingredients.next(response);

		// 		//done loading the ingredients
		// 		this.ui.loadingIngredients = false; 
		// 		return response;
		// 	})
		// ).subscribe({
		// 	error: error => console.error(error) 
		// });
	}

	public init() {
		this.http.get<CoreIngredient[]>(AppSettings.GetAPI() + AppSettings.API_GetIngredient).pipe(
			first()//there should only be one response
		).subscribe({
			next: response => {
				//console.log(response);
				this.Ingredients.next(response);

				//done loading the ingredients
				this.ui.loadingIngredients = false;
			},

			error: err => {
				
			}

		});
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
