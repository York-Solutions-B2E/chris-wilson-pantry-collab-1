import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './Interceptors/AuthInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/Views/login/login.component';
import { HomeComponent } from './Components/Views/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './Components/menu/menu.component';
import { UserbarComponent } from './Components/userbar/userbar.component';
import { RecipesComponent } from './Components/Areas/recipes/recipes.component';
import { RecipeCardComponent } from './Components/recipe-card/recipe-card.component';
import { AddRecipeComponent } from './Components/Areas/add-recipe/add-recipe.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddIngredientDialogComponent } from './Components/add-ingredient-dialog/add-ingredient-dialog.component';
import { AddPantryItemDialogComponent } from './Components/add-pantry-item-dialog/add-pantry-item-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { PantryComponent } from './Components/Areas/pantry/pantry.component';
import { RecipeComponent } from './Components/Areas/recipe/recipe.component';
import { RegisterFamilyComponent } from './Components/Views/register-family/register-family.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    UserbarComponent,
    RecipesComponent,
    RecipeCardComponent,
    AddRecipeComponent,
    AddIngredientDialogComponent,
    AddPantryItemDialogComponent,
    PantryComponent,
    RecipeComponent,
    RegisterFamilyComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatDialogModule,
    MatSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
