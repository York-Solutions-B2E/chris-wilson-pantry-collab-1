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
                };

                _context.Recipes?.Add(newRecipe); 
                _context.SaveChanges();

                //create the link
                LinkedRecipes newLink = new LinkedRecipes
                {
                    FamilyId = recipe.Family,
                    RecipeId = newRecipe.Id,
                    Relationship = 0//0 is creator/owner
                }; 

                _context.LinkedRecipes?.Add(newLink);
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

        public List<RecipeDTO> GetRecipes(int familyId)
        {
            var query = from lr in _context.LinkedRecipes
                        join r in _context.Recipes on lr.RecipeId equals r.Id
                        where lr.FamilyId == familyId

                        select new RecipeDTO
                        {
                            Id= r.Id,
                            Name = r.Name,
                            Description= r.Description,
                            Servings= r.Servings,
                            Directions= r.Directions,
                            Relationship = lr.Relationship,
                            Family= lr.FamilyId,

                        };

            List<RecipeDTO> recipes = query.ToList();

            foreach (var recipe in recipes)
            {
                recipe.Ingredients = this.GetIngredientsFromRecipe(recipe.Id); 
            }

            return recipes; 


        }

        public List<RecipeShort> GetRecipeShorts(int familyId)
        {
            var query = from lr in _context.LinkedRecipes
                        join r in _context.Recipes on lr.RecipeId equals r.Id
                        where lr.FamilyId == familyId

                        select new RecipeShort
                        {
                            Id = r.Id,
                            Name = r.Name,
                            Description = r.Description,
                            Relationship = lr.Relationship,
                        };

            List<RecipeShort> recipes = query.ToList();

            

            return recipes;
        }

        public List<RecipeIngredientDTO> GetIngredientsFromRecipe(int recipeId)
        {
            var query = from ri in _context.RecipeIngredients
                        where ri.RecipeId == recipeId
                        select new RecipeIngredientDTO()
                        {
                            IngredientId= ri.IngredientId,
                           
                            Amount = ri.Weight
                        };

            return query.ToList();


        }
    }
}
