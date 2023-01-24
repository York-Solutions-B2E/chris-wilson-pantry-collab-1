import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { IngreDTO } from 'src/app/dto/IngreDTO';
import { UIService } from '../UI/ui.service';

@Injectable({
	providedIn: 'root'
})
export class IngredService {
	private endPoint = AppSettings.GetAPI(); 
	public Ingredients: BehaviorSubject<IngreDTO[]> = new BehaviorSubject<IngreDTO[]>([]);



	constructor(private http: HttpClient, private ui: UIService) {

		//get the ingredients 
		//this needs to only happen once so do it in the constructor 
		this.http.get<IngreDTO[]>(this.endPoint + AppSettings.API_GetIngredient).pipe(
			first(),
			map(response => {
				console.log(response);
				this.Ingredients.next(response);

				//done loading the ingredients
				this.ui.loadingIngredients = false; 
				return response;
			})
		).subscribe({
			error: error => console.error(error) 
		});
	}

	public AddIngredient(Ingre: IngreDTO) {
		return this.http.post<IngreDTO>(this.endPoint + AppSettings.API_AddIngredient, Ingre).pipe(
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

	public get GetIngredients(){
		return this.Ingredients.value; 
	}
}
