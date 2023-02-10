import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';
import { Family } from 'src/app/Models/Family';
import { FriendsDTO } from 'src/app/Models/FriendsDTO';

@Injectable({
	providedIn: 'root'
})
export class FamilyService {

	constructor(private http: HttpClient) {

	}

	public CreateFamily(familyName: string): Observable<Family>{
		return this.http.post<Family>(AppSettings.GetAPI() + AppSettings.API_AddFamily, {FamilyName: familyName}); 
	}

	public getFamilyDetails(id: number): Observable<Family>{
		return this.http.get<Family>(AppSettings.GetAPI() + AppSettings.API_Family + id);
	}

	public getFamilyFriends(id: number): Observable<FriendsDTO[]>{
		return this.http.get<FriendsDTO[]>(AppSettings.GetAPI() + AppSettings.API_FamilyFriends + id);
	}
	
}
