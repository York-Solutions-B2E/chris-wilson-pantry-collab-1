import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { Family } from 'src/app/Models/Family';

@Injectable({
	providedIn: 'root'
})
export class FamilyService {

	constructor(private http: HttpClient) {

	}

	public CreateFamily(familyName: string): Observable<Family>{
		return this.http.post<Family>(AppSettings.GetAPI() + AppSettings.API_AddFamily, {FamilyName: familyName}); 
	}
}
