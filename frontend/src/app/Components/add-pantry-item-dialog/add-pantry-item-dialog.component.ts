import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IngredService } from 'src/app/Services/Ingredients/ingred.service';
import { MatSelectModule } from '@angular/material/select';
import { IngreDTO } from 'src/app/dto/IngreDTO';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { PantryService } from 'src/app/Services/Pantry/pantry.service';
import { first } from 'rxjs';


@Component({
	selector: 'app-add-pantry-item-dialog',
	templateUrl: './add-pantry-item-dialog.component.html',
	styleUrls: ['./add-pantry-item-dialog.component.css']
})
export class AddPantryItemDialogComponent {

	public ingredients: IngreDTO[] | null;
	public amountToAdd: number = 0;
	public selectedItem: number = 0; 

	constructor(
		public dialogRef: MatDialogRef<AddPantryItemDialogComponent>, 
		public IngreService: IngredService, 
		private auth: AuthenticationService,
		private pantry: PantryService
		) {
		//get the current list of ingredients	
		this.ingredients = this.IngreService.GetIngredients

	}

	public onSelected(id: string){
		this.selectedItem = parseInt(id); 
	}

	public Ok() {
		let familyId = this.auth.currentUserValue?.familyId;
		let item = this.ingredients?.find(x => x.id === this.selectedItem); 

		if(item !== undefined && familyId !== undefined){
			this.pantry.addItemToPantry({id:0, familyId:familyId, ingredient: item?.id || 0, amount: this.amountToAdd}).pipe(first()).subscribe({
				next: resp => {
					//item was added with out issue
					this.dialogRef.close();
				}, 
				error: err => {
					//alert the user to the error
					console.error(err)
				}
			}); 
		}else{
			//alert the user to the error
		}
		
		 
	}

	public Cancel() {
		this.dialogRef.close();
	}
}



