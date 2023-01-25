import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { IngredService } from 'src/app/Services/Ingredients/ingred.service';

@Component({
	selector: 'app-add-ingredient-dialog',
	templateUrl: './add-ingredient-dialog.component.html',
	styleUrls: ['./add-ingredient-dialog.component.css']
})
export class AddIngredientDialogComponent {

	public loading = false;

	public name: string = "";
	public desc: string = "";
	public calories: number = 0;

	constructor(
		public dialogRef: MatDialogRef<AddIngredientDialogComponent>,
		public IngreService: IngredService
	) {

	}

	public Ok() {
		this.IngreService.AddIngredient({id: 0, name: this.name, description: this.desc, calories: this.calories}).pipe(first()).subscribe({
			next: resp => {
				this.dialogRef.close();
			}, 
			error: err => {
				console.error(err)
			}
		}); 
	}

	public Cancel() {
		this.dialogRef.close();
	}

}
