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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    UserbarComponent,
    RecipesComponent,
    RecipeCardComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
