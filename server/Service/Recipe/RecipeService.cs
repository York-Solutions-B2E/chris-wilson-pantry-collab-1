using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DataTransferObj;
using server.Models;

namespace server.Service.RecipeService
{
    public class RecipeService : IRecipeService
    {
        private readonly BackendServerContext _context;

        public RecipeService(BackendServerContext context)
        {
            _context = context;
        }

        public void CreateRecipe(RecipeDTO recipe)
        {
            try
            {
                Recipe newRecipe = new Recipe()
                {
                    Id = 0,
                    Name = recipe.Name,
                    Description = recipe.Description,
                    Servings = recipe.Servings, 
                    Directions = recipe.Directions,
                    Family= recipe.Family,
                };

                _context.Recipes?.Add(newRecipe); 
                _context.SaveChanges();

                if(recipe.Ingredients != null)
                {
                    foreach (var ingredient in recipe.Ingredients)
                    {
                        RecipeIngredient ri = new RecipeIngredient()
                        {
                            Id = 0,
                            RecipeId = newRecipe.Id,
                            IngredientId = ingredient.IngredientId,
                            Weight = ingredient.Amount,
                        }; 

                        _context.RecipeIngredients?.Add(ri);
                        _context.SaveChanges();
                    }
                }
                


            }
            catch (DbUpdateException ex)
            {
                //there was a error writing to the database
                throw new Exception(ex.Message, ex);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }



        }
    }
}
