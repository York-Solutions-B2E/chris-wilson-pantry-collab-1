import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddIngredientDialogComponent } from '../add-ingredient-dialog/add-ingredient-dialog.component';
import { AddPantryItemDialogComponent } from '../add-pantry-item-dialog/add-pantry-item-dialog.component';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent {


	constructor(private dialog: MatDialog) { }


	AddIngredient(): void {
		const dialogRef = this.dialog.open(AddIngredientDialogComponent);

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
		});

	
	}

	public AddToPantry():void {
		const dialogRef = this.dialog.open(AddPantryItemDialogComponent);

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
		});
	}
}
