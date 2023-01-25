import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { IngredService } from 'src/app/Services/Ingredients/ingred.service';
import { UIService } from 'src/app/Services/UI/ui.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
	selector: 'app-register-family',
	templateUrl: './register-family.component.html',
	styleUrls: ['./register-family.component.css']
})
export class RegisterFamilyComponent implements OnInit, OnDestroy {

	//should do a formgroup 
	public familyName: string = "";
	public firstName: string = "";
	public userName: string = "";
	public password: string = "";

	public warning: string = ""

	constructor(
		public ui: UIService,
		public IngreService: IngredService,
		private userService: UserService,
		private familyService: FamilyService,
	) {

	}

	ngOnInit(): void {
		this.warning = "did work";
	}
	ngOnDestroy(): void {

	}

	public cancel() {
		this.ui.setPage("login_page");
	}

	submit() {
		this.familyService.CreateFamily(this.familyName).pipe(first()).subscribe({
			next: response => {
				//family was created 
				this.userService.createUser({ userName: this.userName, email: "", password: this.password, firstName: this.firstName, familyId: response.id }).pipe(first()).subscribe({
					next: () => {
						//account has been created
						this.ui.setPage("login_page");
					}, 
					error: err => {
						this.warning = err; 
					}
				});
			},
			error: err => {
				this.warning = err;
				console.warn(err)
			}
		});
	}


}
