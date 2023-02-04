import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { Pantry } from 'src/app/Models/Pantry';
import { UIService } from '../UI/ui.service';

@Injectable({
	providedIn: 'root'
})
export class PantryService {
	private endPoint = AppSettings.GetAPI();

	private PantryItems: BehaviorSubject<Pantry[]> = new BehaviorSubject<Pantry[]>([]);

	constructor(private http: HttpClient, private ui: UIService) {
		
	}

	public inti(familyId: number): void{
		this.http.get<Pantry[]>(`${this.endPoint}${AppSettings.API_GetPantryItems}${familyId}`).pipe(
			first(),
			map(response => {
				
				console.log(response);
				this.PantryItems.next(response);

				//done loading the pantry items
				this.ui.loadingPantryItems = false; 
				return response;
			})
		).subscribe();
	}

	public addItemToPantry(pantry: Pantry){
		return this.http.post(this.endPoint + AppSettings.API_AddPantryItems, pantry); 
	}

	public getPantryItems(familyId: number){
		return this.http.get<Pantry[]>(this.endPoint + AppSettings.API_GetPantryItems + `${familyId}`); 
	}


}
