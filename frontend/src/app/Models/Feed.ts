import { Family } from "./Family";
import { Recipe } from "./Recipe";


export interface Feed{
    id: number;
    family: Family; 
    recipe: Recipe;
    comment: string; 
    Posted: Date;
}
