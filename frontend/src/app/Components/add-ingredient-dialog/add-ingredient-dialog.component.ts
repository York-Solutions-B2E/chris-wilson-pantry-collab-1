import { Component, Inject, OnInit } from '@angular/core';
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
export class AddIngredientDialogComponent implements OnInit {

	public ingredientList: CoreIngredient[] = []; 
	public selectedIngredientList: any[] = []; 
	
	public ingredientName: string = "";
	public ingredientAmount: number = 0;
	public selectedCards: CoreIngredientsCardComponent[] = [];


	constructor(
		private dialogRef: MatDialogRef<AddIngredientDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: any,
		private ingredientService: IngredientService
	  ) { }

	ngOnInit(): void {
		this.selectedIngredientList = this.data.ingredients
		this.ingredientList = this.ingredientService.GetIngredients; 
	}

  addIngredient() {
    this.data.ingredients.push({ name: this.ingredientName, amount: this.ingredientAmount });
    this.dialogRef.close();
  }

	// constructor(
	// 	//@Inject(MAT_DIALOG_DATA) public images: any,
	// 	public dialogRef: MatDialogRef<AddIngredientDialogComponent>,
	// 	private ingredientService: IngredientService
	// 	) {
	// 		this.ingredientList = this.ingredientService.GetIngredients; 

	// 		//console.log("ing", this.ingredientList); 
	// 	}
  
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
