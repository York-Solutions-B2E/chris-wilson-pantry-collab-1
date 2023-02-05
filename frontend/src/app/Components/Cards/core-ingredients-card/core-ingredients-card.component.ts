import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CoreIngredient } from 'src/app/Models/CoreIngredient';

@Component({
	selector: 'app-core-ingredients-card',
	templateUrl: './core-ingredients-card.component.html',
	styleUrls: ['./core-ingredients-card.component.css']
})
export class CoreIngredientsCardComponent implements OnInit {
	@Input() ingredient: CoreIngredient;
	@Output() selectedCards = new EventEmitter<CoreIngredientsCardComponent[]>();

	public isSelected = false;

	constructor() {
		this.ingredient = {} as CoreIngredient;

	}

	ngOnInit() {
		//console.log(this.ingredient);
	}

	onClick() {
		console.log(this, "clicked")
		this.isSelected = !this.isSelected;
		this.selectedCards.emit([this]);
	}
}
