import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { UIService } from 'src/app/Services/UI/ui.service';

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
		private ui: UIService
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
				 this.ui.setPage("home_page"); 
			}, 
			error: error => {
				console.error(error); 
			}
		})
	}

	registerFamily(){
		this.ui.setPage("registerFamily"); 
	}

}
