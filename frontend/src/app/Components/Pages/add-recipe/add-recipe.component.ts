import { Component } from '@angular/core';
import { Subscription, Subject, first, debounceTime } from 'rxjs';


import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { IngredientService } from 'src/app/Services/Ingredients/ingredient.service';
import { RecipeService } from 'src/app/Services/Recipe/recipe.service';
import { UIService } from 'src/app/Services/UI/ui.service';
import {MatDialog} from '@angular/material/dialog';
import { AddIngredientDialogComponent } from '../../add-ingredient-dialog/add-ingredient-dialog.component';
import { CoreIngredient } from 'src/app/Models/CoreIngredient';
import { RecipeIngredient } from 'src/app/Models/RecipeIngredient';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  public ingredientsList: CoreIngredient[] = [];
	private ingSub: Subscription | null = null; 
	public recipeName = "";



	public Ingredients: RecipeIngredient[] = [];

	public amountToAdd: number = 0;
	public selectedItem: number = 0;

	public directions = "";

	public redditResults: any[] = [];
	private modelChanged: Subject<string> = new Subject<string>();
	private subscription: Subscription | null = null;
	private debounceTime = 1000; //wait for a second

	
	//ui 
	private loading = false; 

	constructor(
		public ui: UIService, 
		public IngredientService: IngredientService, 
		private recipeService: RecipeService, 
		private auth: AuthenticationService,
		private dialog: MatDialog, 
		) {

	}



	public onSelected(id: string) {
		this.selectedItem = parseInt(id);
	}

	public addIngredient(){
		const dialogRef = this.dialog.open(AddIngredientDialogComponent);

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
		});

	}



	public oldAddIngredient() {
		//let Id = this.selectedItem;
		let Amount = this.amountToAdd;

		let item = this.ingredientsList?.find(x => x.id === this.selectedItem);

		if (item != undefined && item.id !== null) {
			console.log(item)
			this.Ingredients.push({ ingredientId: item?.id, name: item?.name, amount: this.amountToAdd });
		}

		//get the title and add the items to it and search reddit
		let search = this.recipeName.split(" ");
		this.Ingredients.forEach(x => {
			search.push(x.name)
		});  
		this.searchReddit(search); 


	}

	public save() { 
		this.loading = true; 

		if(this.auth.currentUserValue){//have to check for this to be happy
			this.recipeService.createRecipe({
			id: 0, 
			name: this.recipeName, 
			description: "", 
			servings:0, 
			directions: this.directions, 
			family: this.auth.currentUserValue.familyId, 
			ingredients: this.Ingredients, 
			relationship: 0
		}).pipe(first()).subscribe({
			next: response => {
				this.loading = false; 
				//Todo: add navigation redirect
			},
			error: err => console.error(err)
		})
		}
		
	}

	
	

	ngOnInit(): void {
		this.ingSub = this.IngredientService.Ingredients.subscribe(response => this.ingredientsList = response);

		this.subscription = this.modelChanged
			.pipe(
				debounceTime(this.debounceTime), //wait 
			)
			.subscribe(() => {
				//console.log("searching for: ", this.recipeName.split(" "))
				this.searchReddit(this.recipeName.split(" "));
			});
	}

	inputChanged() {
		
		this.modelChanged.next("")
	}

	ngOnDestroy(): void {
		this.ingSub?.unsubscribe(); 
		this.subscription?.unsubscribe();
	}

	//todo: move this to a service
	public searchReddit(terms: string[]) {
		let searchTerm = "";
		terms.forEach(x => { searchTerm += `,${x}` })

		//could not get this to work 
		//it kept giving me CORS errors 
		//reddit doesn't use CORS so I don't know what the problem is
		//fetch worked

		//https://www.reddit.com/r/recipes/search?q=potatoes%20dog&restrict_sr=on&include_over_18=on&sort=relevance&t=all
		// this.http.get(`https://api.reddit.com/r/recipes/search.json?q=${searchTerm}&sort=relevance&limit=15`).subscribe({
		// this.http.get(`https://api.reddit.com/r/popular.json`).subscribe({
		// 	next: response => {
		// 		console.log(response); 
		// 	}, 
		// 	error: err => console.log(err), 
		// }); 


		//&restrict_sr=on is needed to keep the search to recipies
		fetch(`https://api.reddit.com/r/recipes/search.json?q=${searchTerm}&sort=relevance&limit=15&restrict_sr=on`)
			.then((response) => response.json())
			.then((data) => {
				//console.log(data)

				this.redditResults = data.data.children;

				console.log(this.redditResults)

			});

	}
}
