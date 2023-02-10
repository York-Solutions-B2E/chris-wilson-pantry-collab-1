import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Family } from 'src/app/Models/Family';
import { FriendsDTO } from 'src/app/Models/FriendsDTO';
import { Recipe } from 'src/app/Models/Recipe';
import { RecipeShort } from 'src/app/Models/RecipeShorts';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import { RecipeService } from 'src/app/Services/Recipe/recipe.service';

@Component({
	selector: 'app-family-page',
	templateUrl: './family-page.component.html',
	styleUrls: ['./family-page.component.css']
})
export class FamilyPageComponent implements OnInit {

	public family: Family = {} as Family;
	public friends: FriendsDTO[] = [];
	public recipes: RecipeShort[] = {} as RecipeShort[]; //this doesn't actually make an empty array

	public myFamily: boolean = false;

	//are we friends 
	
	public senderFriend = false;
	public recieverFriend = false;
	public friendshipStatus = "unknown";

	public errorMsg: string = "";

	public isLoading: boolean = false;
	private gotFriends: boolean = false;
	private gotFamily: boolean = false;
	private gotRecipies: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private recipieService: RecipeService,
		private authService: AuthenticationService,
		private familyService: FamilyService
	) {

	}

	ngOnInit() {
		this.recipes = [];
		this.isLoading = true; 

		this.route.queryParams.subscribe(params => {

			//console.log(params['familyId']);
			this.family.id = params['familyId'];

			if (this.family.id == this.authService.currentUserValue?.familyId) {//yes == ones a string another is a number
				this.myFamily = true;


			} else {
				this.myFamily = false;

			}


			this.getFriends(); 


			//get the family details 
			this.getFamilyDetails(); 


		});
	}

	private getRecipes(id: number) {
		
		this.recipieService.getRecipeShorts(id).subscribe({
			next: recipes => {
				console.log("shorts ", recipes)
				this.recipes = recipes;

				this.gotRecipies = true; 
				this.doneLoading(); 
			},
			error: err => {
				this.errorMsg = "There was an error loading the recipes. Please try again. "
				console.error(err);
			}
		});
	}

	public recipeClick(r: RecipeShort) {
		console.log(r)

	}

	private doneLoading() {
		this.isLoading = !(this.gotFamily && this.gotFriends && this.gotRecipies); 
	}

	private getFriends(){

		if (this.authService.currentUserValue != null && this.authService.currentUserValue?.familyId !== null) {
			let id = this.authService.currentUserValue.familyId;

			this.familyService.getFamilyFriends(id).pipe(first()).subscribe({
				next: res => {
					//console.log(res);

					if (res.length) {//its not zero 
						this.friends = res;

						let found = false;
						res.forEach(x => {

							if (x.senderId == id && x.receiverId == this.family.id ) {
								this.senderFriend = true;
								this.friendshipStatus = x.status;
								found = true;
							}
						});

						
						if(!found){
							//your in the list but you weren't on the sender side you must be on the reciver
							res.forEach(x => {
								
								if (x.senderId == this.family.id && x.receiverId == id) {
									this.recieverFriend = true;
									this.friendshipStatus = x.status;
									found = true;
								}
							});
						}

					}

					console.log(this.senderFriend, this.recieverFriend, this.friendshipStatus)

					this.gotFriends = true;
					this.doneLoading();

				},
				error: err => {
					console.log(err)
				}
			});
		}
	}

	private getFamilyDetails(){
		this.familyService.getFamilyDetails(this.family.id).pipe(first()).subscribe({
			next: res => {
				this.family = res;
				this.getRecipes(this.family.id);

				this.gotFamily = true;
				this.doneLoading();

			},
			error: err => {
				this.errorMsg = "No Family with that id exists"
			}
		});
	}

	public acceptRequest(){
		console.log("code accept request")
	}

	public denyRequest(){
		console.log("code deny request")
	}

	public sendFriendRequest(){
		console.log("send frend request")
	}


}
