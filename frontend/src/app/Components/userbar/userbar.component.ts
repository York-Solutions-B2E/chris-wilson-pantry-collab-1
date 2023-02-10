import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { UIService } from 'src/app/Services/UI/ui.service';
import {MatDialog} from '@angular/material/dialog';
import { AddUserToFamilyComponent } from '../add-user-to-family/add-user-to-family.component';
import { Router, NavigationExtras } from '@angular/router';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { first } from 'rxjs';
import { FriendsDTO } from 'src/app/Models/FriendsDTO';
import { FriendRequestsComponent } from '../friend-requests/friend-requests.component';


@Component({
	selector: 'app-userbar',
	templateUrl: './userbar.component.html',
	styleUrls: ['./userbar.component.css']
})
export class UserbarComponent {



	public friends: FriendsDTO[] = [];
	public friendsRequests: FriendsDTO[] = [];

	
	constructor(
		private auth: AuthenticationService, 
		private ui: UIService, 
		private dialog: MatDialog, 
		public router: Router,
		private authService: AuthenticationService,
		private familyService: FamilyService
		
		) {
		
	}

	ngOnInit(){
		this.getFriends(); 
	}

	public logoff_btn(){
		this.auth.LogOut(); 
		this.router.navigate(["login"]);
	}

	public familyPage(){
		let navigationExtras: NavigationExtras = {
			queryParams: {
			  familyId: this.auth.currentUserValue?.familyId,
			}
		  };
		  this.router.navigate(['/family'], navigationExtras);
	
	}

	public addRecipe_btn(){
		
	}

	public AddUserToFamily(){
		const dialogRef = this.dialog.open(AddUserToFamilyComponent);

		dialogRef.afterClosed().subscribe(result => {
			//console.log(result);
		});
	}

	private getFriends(){



		if (this.authService.currentUserValue != null && this.authService.currentUserValue?.familyId !== null) {
			let id = this.authService.currentUserValue.familyId;

			this.familyService.getFamilyFriends(id).pipe(first()).subscribe({
				next: res => {
					console.log(res, res.length);

					if (res.length) {//its not zero 
						this.friends = res;

						res.forEach(x => {

							if (x.receiverId == id && x.status === "pending") {
								this.friendsRequests.push(x); 

							}
						});
					}			
				},
				error: err => {
					console.log(err)
				}
			});
		}
	}

	public friendsRequestsDialog(){
		const dialogRef = this.dialog.open(FriendRequestsComponent);

		dialogRef.afterClosed().subscribe(result => {
			//console.log(result);
		});
	}
}
