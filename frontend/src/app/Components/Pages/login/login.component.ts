import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
		private ui: UIService, 
		private router: Router
		) {

	}


	ngOnInit(): void {
		
	}


	login(){
		this.auth.login(
			this.loginForm.controls.username.value || "",
			this.loginForm.controls.password.value || ""
		).pipe(first())
		.subscribe({
			next: response => {
				this.router.navigate([""]);   
			}, 
			error: error => {
				console.error(error); 
			}
		})
	}

	registerFamily(){
		this.router.navigate(['/registration']);
	}

}
