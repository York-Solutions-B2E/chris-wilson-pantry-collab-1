import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { UIService } from 'src/app/Services/UI/ui.service';
import {MatDialog} from '@angular/material/dialog';
import { AddUserToFamilyComponent } from '../add-user-to-family/add-user-to-family.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-userbar',
	templateUrl: './userbar.component.html',
	styleUrls: ['./userbar.component.css']
})
export class UserbarComponent {

	constructor(
		private auth: AuthenticationService, 
		private ui: UIService, 
		private dialog: MatDialog, 
		public router: Router
		
		) {
		
	}

	public logoff_btn(){
		this.auth.LogOut(); 
		this.router.navigate(["login"]);
	}

	public changeView(view:string){
		
	
	}

	public addRecipe_btn(){
		
	}

	public AddUserToFamily(){
		const dialogRef = this.dialog.open(AddUserToFamilyComponent);

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
		});
	}
}
