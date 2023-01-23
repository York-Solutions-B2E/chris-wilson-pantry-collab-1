import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { UIService } from 'src/app/Services/UI/ui.service';

@Component({
	selector: 'app-userbar',
	templateUrl: './userbar.component.html',
	styleUrls: ['./userbar.component.css']
})
export class UserbarComponent {

	constructor(private auth: AuthenticationService, private ui: UIService) {
		
	}

	public logoff_btn(){
		this.auth.LogOut(); 
		this.ui.setPage("login_page"); 
	}

	public changeView(view:string){
		this.ui.setArea(view);
	
	}

	public addRecipe_btn(){
		this.ui.setArea("add_recipes");
	}
}