import { Component } from '@angular/core';
import { Dictionary } from 'src/app/Models/Dictionary';
import { Ingredients } from 'src/app/Models/Ingredients';
import { IngSection } from 'src/app/Models/IngSection';
import { UIService } from 'src/app/Services/UI/ui.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {

  
  public IngredientSections: IngSection[] = []; 

  public Servings = 4; 

  public Ingredients: Ingredients[] = []; 


  
  constructor(public ui:UIService){

    //main area 
    //this.AddSection("Ingredients"); 
  }

  public AddSection(name:string):void {
    
    this.IngredientSections.push({Name: name, Ingredients: []})
  }

  public RemoveSection(name: string): void {
    this.IngredientSections.forEach((element, index) => {
      if(element.Name === name){
        this.IngredientSections.splice(index, 1); 
        return
      }
    })
  }

  public AddIng(){

  }
}
