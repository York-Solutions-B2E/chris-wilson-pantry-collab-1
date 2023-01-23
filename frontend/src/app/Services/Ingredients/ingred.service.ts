import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { IngreDTO } from 'src/app/dto/IngreDTO';
import { UIService } from '../UI/ui.service';

@Injectable({
	providedIn: 'root'
})
export class IngredService {
	private endPoint = AppSettings.API_Endpoint + ":" + AppSettings.API_Port;
	private Ingredients: IngreDTO[] = [];

	constructor(private http: HttpClient, private ui: UIService) {
		
		this.http.get<IngreDTO[]>(this.endPoint + AppSettings.API_GetIngredient).pipe(
			first(),
			map( response => {
				this.Ingredients = response; 
				return response; 
			})
		).subscribe();
	 }

	public AddIngredient(Ingre: IngreDTO) {
		return this.http.post<IngreDTO>(this.endPoint + AppSettings.API_AddIngredient, Ingre).pipe(
			map(response => {
				this.Ingredients.push(response); 

				return response; 
			})
		);
	}
}
