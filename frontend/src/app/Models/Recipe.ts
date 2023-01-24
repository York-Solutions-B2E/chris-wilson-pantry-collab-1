import { RecipeIngredient } from "./RecipeIngredient";


export interface Recipe{
    id: number; 
    name: string;
    description: string;
    servings: number;
    directions: string;
    family: number;
    ingredients: RecipeIngredient[];
}