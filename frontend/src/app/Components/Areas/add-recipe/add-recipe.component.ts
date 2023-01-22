import { Component } from '@angular/core';
import { Dictionary } from 'src/app/Models/Dictionary';
import { Ingredients } from 'src/app/Models/Ingredients';
import { UIService } from 'src/app/Services/UI/ui.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {

  public SectionCount:number = 1; 
  public IngredientSection: Dictionary<Ingredients[]> = {
    "main": [],
  }

  public Servings = 4; 
  
  constructor(public ui:UIService){

  }

  public AddSection(name:string):void {
    //only one section named main allowed
    if(name === 'main') return;
    
    this.IngredientSection[name] = []; 
    this.SectionCount++; 
  }

  public RemoveSection(name: string): void {
    //can't delete main section
    if(name === 'main') return; 

    delete this.IngredientSection[name]; 
    this.SectionCount--; 
  }
}
