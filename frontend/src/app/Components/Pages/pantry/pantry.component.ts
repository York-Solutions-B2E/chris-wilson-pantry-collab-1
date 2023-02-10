import { Component } from '@angular/core';
import { first } from 'rxjs';
import { CoreIngredient } from 'src/app/Models/CoreIngredient';
import { Pantry } from 'src/app/Models/Pantry';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { PantryService } from 'src/app/Services/Pantry/pantry.service';
import { UIService } from 'src/app/Services/UI/ui.service';
import { IngredientService } from 'src/app/Services/Ingredients/ingredient.service';


@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent {

  public pantryItems: Pantry[] = []; 
  public ingredients: CoreIngredient[] = []; 
  public selectedIngredient: Pantry|null = null; 

  public displayedItems: Pantry[] = []; 
  public updateButtonDisabled = false; 

  //for the search term
  public searchTerm = ""; 

  constructor(
		public ui: UIService, 
		public ingredientService: IngredientService, 
		private pantryService: PantryService, 
		private auth: AuthenticationService
		) {
      //this.addData();
    }

  ngOnInit(): void {
    if(this.auth.currentUserValue?.familyId){
      this.pantryService.getPantryItems(this.auth.currentUserValue?.familyId).pipe(first()).subscribe({
        next: response => {
          console.log(response);
          this.pantryItems = response
          this.displayedItems = this.pantryItems; 
        },
        error: err => {
          //TODO: tell the user 
          console.error(err);
        } 
    });
    }
     
    this.ingredients = this.ingredientService.GetIngredients;
    console.log("ingre", this.ingredients)
  }

  getIngredientName(id: number): string{
		return this.ingredients.find(x => x.id == id)?.name || ""; 
	}

  public selectIngredient(i: Pantry){
    this.selectedIngredient = i; 
  }

  public updateIngredient(){
    this.updateButtonDisabled = true; 

    if(this.selectedIngredient){
      this.pantryService.updatePantryItem(this.selectedIngredient).pipe(
        first()//there should only be one response
      ).subscribe({
        next: response => {
          console.log("updated")
          this.updateButtonDisabled = false; 
        },
  
        error: err => {
          
        }
  
      });
    }
      
  }

  public searchItems(){
    let searchTerm = this.searchTerm; 
    if(searchTerm != ""){
      const results: Pantry[] = [];
    for (const item of this.pantryItems) {
      console.log(this.getIngredientName(item.id).toLowerCase(), searchTerm, this.getIngredientName(item.id).toLowerCase().includes(searchTerm.toLowerCase()))
      if (this.getIngredientName(item.ingredient).toLowerCase().includes(searchTerm.toLowerCase())) {
        console.log("adding: ", this.getIngredientName(item.ingredient), item); 
        results.push(item);
      }

      this.displayedItems = results; 
    }
    }else{
      //reset
      this.displayedItems = this.pantryItems; 
    }
    
  }


  //add some ingredients
  private addData(){
    let fid = this.auth.currentUserValue?.familyId as number; 

    for (let index = 1; index < 12; index++) {
      this.pantryService.addItemToPantry({
        id: 0,
        familyId: fid,
        ingredient: index,
        amount: 10
      }).subscribe(response => console.log(response))
      
    }
  }
}
