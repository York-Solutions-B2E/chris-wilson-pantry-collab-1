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
import { RecipesComponent } from './Components/recipes/recipes.component';

import { AddRecipeComponent } from './Components/Pages/add-recipe/add-recipe.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddIngredientDialogComponent } from './Components/add-ingredient-dialog/add-ingredient-dialog.component';
import { AddPantryItemDialogComponent } from './Components/add-pantry-item-dialog/add-pantry-item-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { PantryComponent } from './Components/Pages/pantry/pantry.component';
import { RecipeComponent } from './Components/recipe/recipe.component';
import { RegisterFamilyComponent } from './Components/Pages/register-family/register-family.component';
import { AddUserToFamilyComponent } from './Components/add-user-to-family/add-user-to-family.component';
import { AppRoutingModule } from './appRoutingModule';
import { CoreIngredientsCardComponent } from './Components/Cards/core-ingredients-card/core-ingredients-card.component';
import { FeedItemComponent } from './Components/feed-item/feed-item.component';
import { FamilyPageComponent } from './Components/Pages/family-page/family-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FriendRequestsComponent } from './Components/friend-requests/friend-requests.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserbarComponent,
    RecipesComponent,
    AddIngredientDialogComponent,
    AddPantryItemDialogComponent,
    PantryComponent,
    RecipeComponent,
    RegisterFamilyComponent,
    AddUserToFamilyComponent,
    AddRecipeComponent,
    CoreIngredientsCardComponent,
    FeedItemComponent,
    FamilyPageComponent,
    FriendRequestsComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatDialogModule,
    MatSelectModule, 
    AppRoutingModule, 
    MatProgressSpinnerModule, 
    MatInputModule,
    MatFormFieldModule, 
    CommonModule,
    MatIconModule,

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
