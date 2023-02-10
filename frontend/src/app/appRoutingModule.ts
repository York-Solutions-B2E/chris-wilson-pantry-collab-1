import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AuthGuard } from './AuthGuard';
import { AddRecipeComponent } from './Components/Pages/add-recipe/add-recipe.component';
import { FamilyPageComponent } from './Components/Pages/family-page/family-page.component';
import { HomeComponent } from './Components/Pages/home/home.component';
import { LoginComponent } from './Components/Pages/login/login.component';
import { PantryComponent } from './Components/Pages/pantry/pantry.component';
import { RegisterFamilyComponent } from './Components/Pages/register-family/register-family.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegisterFamilyComponent },
    { path: 'addrecipe', component: AddRecipeComponent, canActivate: [AuthGuard]  },
    { path: 'family', component: FamilyPageComponent, canActivate: [AuthGuard]  },
    { path: 'pantry', component: PantryComponent, canActivate: [AuthGuard]  },
]; 

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }