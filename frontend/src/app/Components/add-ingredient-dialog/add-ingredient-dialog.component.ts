import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CoreIngredient } from 'src/app/Models/CoreIngredient';
import { IngredientService } from 'src/app/Services/Ingredients/ingredient.service';
import { CoreIngredientsCardComponent } from '../Cards/core-ingredients-card/core-ingredients-card.component';

@Component({
	selector: 'app-add-ingredient-dialog',
	templateUrl: './add-ingredient-dialog.component.html',
	styleUrls: ['./add-ingredient-dialog.component.css']
})
export class AddIngredientDialogComponent {

	public ingredientList: CoreIngredient[] = []; 

	selectedCards: CoreIngredientsCardComponent[] = [];

	constructor(
		//@Inject(MAT_DIALOG_DATA) public images: any,
		public dialogRef: MatDialogRef<AddIngredientDialogComponent>,
		private ingredientService: IngredientService
		) {
			this.ingredientList = this.ingredientService.GetIngredients; 

			//console.log("ing", this.ingredientList); 
		}
  
	onSelectionChange(cards: CoreIngredientsCardComponent[]) {
	  this.selectedCards = cards;
	  console.log(cards)
	}
  
	closeDialog() {
	  //this.selectedCards.close(this.selectedCards);
	  this.dialogRef.close();

	}

	public Cancel() {
		this.dialogRef.close();
	}

	public Ok(){

	}

}
