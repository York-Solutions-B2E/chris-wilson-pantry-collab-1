import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IngredientService } from 'src/app/Services/Ingredients/ingredient.service';
import { MatSelectModule } from '@angular/material/select';

import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { PantryService } from 'src/app/Services/Pantry/pantry.service';
import { first } from 'rxjs';



@Component({
	selector: 'app-add-pantry-item-dialog',
	templateUrl: './add-pantry-item-dialog.component.html',
	styleUrls: ['./add-pantry-item-dialog.component.css']
})
export class AddPantryItemDialogComponent {

	//public ingredients: Ingredient[] | null;
	public amountToAdd: number = 0;
	public selectedItem: number = 0; 

	constructor(
		public dialogRef: MatDialogRef<AddPantryItemDialogComponent>, 
		public IngredientService: IngredientService, 
		private auth: AuthenticationService,
		private pantry: PantryService
		) {
		//get the current list of ingredients	
		//this.ingredients = this.IngredientService.GetIngredients

	}

	public onSelected(id: string){
		this.selectedItem = parseInt(id); 
	}

	public Ok() {
		let familyId = this.auth.currentUserValue?.familyId;
		//let item = this.ingredients?.find(x => x.id === this.selectedItem); 

		// if(item !== undefined && familyId !== undefined && item.id !== null){
		// 	this.pantry.addItemToPantry({id:0, familyId:familyId, ingredient: item?.id, amount: this.amountToAdd}).pipe(first()).subscribe({
		// 		next: resp => {
		// 			//item was added with out issue
		// 			this.dialogRef.close();
		// 		}, 
		// 		error: err => {
		// 			//alert the user to the error
		// 			console.error(err)
		// 		}
		// 	}); 
		// }else{
		// 	//alert the user to the error
		// }
		
		 
	}

	public Cancel() {
		this.dialogRef.close();
	}
}



