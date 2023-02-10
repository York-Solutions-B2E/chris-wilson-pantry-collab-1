import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { ImagesService } from 'src/app/Services/Images/images.service';
import { IngredientService } from 'src/app/Services/Ingredients/ingredient.service';
import { UIService } from 'src/app/Services/UI/ui.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
	selector: 'app-register-family',
	templateUrl: './register-family.component.html',
	styleUrls: ['./register-family.component.css']
})
export class RegisterFamilyComponent implements OnInit, OnDestroy {

	 
	familyRegistrationForm = new FormGroup({
		familyName: new FormControl(''),
		firstName: new FormControl(''),
		userName: new FormControl(''),
		password: new FormControl('')
	  });

	familyName = this.familyRegistrationForm.get('familyName')?.value;
	firstName = this.familyRegistrationForm.get('firstName')?.value;
	userName = this.familyRegistrationForm.get('userName')?.value;
	password = this.familyRegistrationForm.get('password')?.value;

	public warning: string = ""

	public selectedFile:any;

	constructor(
		public ui: UIService,
		public IngredientService: IngredientService,
		private userService: UserService,
		private familyService: FamilyService, 
		private router: Router, 
		private imageService: ImagesService
	) {

	}

	ngOnInit(): void {
		this.warning = "";
	}
	ngOnDestroy(): void {

	}

	public cancel() {
		this.router.navigate([""]); 
	}

	submit() {

		console.log(this.familyName, this.userName, this.firstName, this.password)
		// this.familyService.CreateFamily(this.familyName).pipe(first()).subscribe({
		// 	next: response => {
		// 		//family was created 
		// 		this.userService.createUser({ userName: this.userName, email: "", password: this.password, firstName: this.firstName, familyId: response.id }).pipe(first()).subscribe({
		// 			next: () => {
		// 				//account has been created
		// 				this.ui.setPage("login_page");
		// 			}, 
		// 			error: err => {
		// 				this.warning = err; 
		// 			}
		// 		});
		// 	},
		// 	error: err => {
		// 		this.warning = err;
		// 		console.warn(err)
		// 	}
		// });
	}

	onFileChange(event:any) {
        this.selectedFile = event.target.files[0];
    }

	uploadImage() {
		const uploadData = new FormData();
		uploadData.append('image', this.selectedFile, this.selectedFile.name);
	  
		this.imageService.uploadImage(uploadData).subscribe(res => {
			console.log(res);
		  });
	  }


}
