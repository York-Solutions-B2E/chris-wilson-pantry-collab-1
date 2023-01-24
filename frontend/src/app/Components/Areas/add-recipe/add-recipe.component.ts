import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime, first } from 'rxjs';
import { IngreDTO } from 'src/app/dto/IngreDTO';
import { Ingredients } from 'src/app/Models/Ingredients';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { IngredService } from 'src/app/Services/Ingredients/ingred.service';
import { RecipeService } from 'src/app/Services/Recipe/recipe.service';
import { UIService } from 'src/app/Services/UI/ui.service';

@Component({
	selector: 'app-add-recipe',
	templateUrl: './add-recipe.component.html',
	styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit, OnDestroy{
	public ingredientsList: IngreDTO[] = [];
	private ingSub: Subscription | null = null; 
	public recipeName = "";

	public Servings = 4;

	public Ingredients: Ingredients[] = [];

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
		public IngreService: IngredService, 
		private recipeService: RecipeService, 
		private auth: AuthenticationService
		) {

	}



	public onSelected(id: string) {
		this.selectedItem = parseInt(id);
	}



	public addIngredient() {
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

		if(this.auth.currentUserValue){
			this.recipeService.createRecipe({
			id: 0, 
			name: this.recipeName, 
			description: "", 
			servings:0, 
			directions: this.directions, 
			family: this.auth.currentUserValue.familyId, //have to check for this to be happy
			ingredients: this.Ingredients 
		}).pipe(first()).subscribe({
			next: response => {
				this.loading = false; 
				this.ui.setArea("recipes")
			},
			error: err => console.error(err)
		})
		}
		
	}

	
	

	ngOnInit(): void {
		this.ingSub = this.IngreService.Ingredients.subscribe(response => this.ingredientsList = response);

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
		//this.http.get(`https://api.reddit.com/r/recipes/search.json?q=${searchTerm}&sort=relevance&limit=15`).subscribe({
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
