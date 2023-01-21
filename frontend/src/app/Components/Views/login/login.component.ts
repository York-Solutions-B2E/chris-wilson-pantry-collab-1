import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

	//form
	loginForm = this.formBuilder.group({
		username: ['', Validators.required],
		password: ['', Validators.required]
	});

	loading = false;
    submitted = false;

	constructor(
		private auth: AuthenticationService,
		private formBuilder: FormBuilder,
		) {

	}


	ngOnInit(): void {
		
	}


	onSubmit(){


		this.auth.login(
			this.loginForm.controls.username.value || "",
			this.loginForm.controls.password.value || ""
		).pipe(first())
		.subscribe({
			next: response => {
				console.log("you have logged in"); 
				console.log(this.auth.currentUserValue); 
			}, 
			error: error => {
				console.error(error); 
			}
		})
	}


}
