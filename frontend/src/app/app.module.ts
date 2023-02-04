import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './Interceptors/AuthInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/Pages/login/login.component';
import { HomeComponent } from './Components/Pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserbarComponent } from './Components/userbar/userbar.component';
import { RecipesComponent } from './Components/Areas/recipes/recipes.component';
import { RecipeCardComponent } from './Components/recipe-card/recipe-card.component';
import { AddRecipeComponent } from './Components/Pages/add-recipe/add-recipe.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddIngredientDialogComponent } from './Components/add-ingredient-dialog/add-ingredient-dialog.component';
import { AddPantryItemDialogComponent } from './Components/add-pantry-item-dialog/add-pantry-item-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { PantryComponent } from './Components/Areas/pantry/pantry.component';
import { RecipeComponent } from './Components/Areas/recipe/recipe.component';
import { RegisterFamilyComponent } from './Components/Pages/register-family/register-family.component';
import { AddUserToFamilyComponent } from './Components/add-user-to-family/add-user-to-family.component';
import { AppRoutingModule } from './appRoutingModule';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserbarComponent,
    RecipesComponent,
    RecipeCardComponent,
    AddIngredientDialogComponent,
    AddPantryItemDialogComponent,
    PantryComponent,
    RecipeComponent,
    RegisterFamilyComponent,
    AddUserToFamilyComponent,
    AddRecipeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatDialogModule,
    MatSelectModule, 
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
