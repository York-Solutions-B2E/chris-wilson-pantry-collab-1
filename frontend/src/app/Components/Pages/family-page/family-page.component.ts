import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/Models/Recipe';
import { RecipeShort } from 'src/app/Models/RecipeShorts';
import { AuthenticationService } from 'src/app/Services/Authtication/authentication.service';
import { RecipeService } from 'src/app/Services/Recipe/recipe.service';

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.css']
})
export class FamilyPageComponent implements OnInit {

  public familyId: number = 0; 
  public isLoading: boolean = false;
  public recipes: RecipeShort[] = {} as RecipeShort[]; 
  
  public myFamily: boolean = false; 

  constructor(private route: ActivatedRoute, private recipieService: RecipeService, private authService: AuthenticationService) { }

  ngOnInit() {

    

    this.route.queryParams.subscribe(params => {
      console.log(params['familyId']);
      this.familyId = params['familyId'];
      
      if(this.familyId == this.authService.currentUserValue?.familyId){//yes == ones a string another is a number
          this.myFamily = true; 
      }else{
        this.myFamily = false;
      }

      this.getRecipies(this.familyId); 
    });
  }

  private getRecipies(id: number){
    this.isLoading = true; 
    this.recipieService.getRecipeShorts(id).subscribe({
      next: recipes => {
        console.log(recipes)
        this.recipes = recipes; 

        this.isLoading = false; 
      }
    });
  }

  
}
