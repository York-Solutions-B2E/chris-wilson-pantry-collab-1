using server.DataTransferObj;

namespace server.Service.RecipeService
{
    public interface IRecipeService
    {
        public void CreateRecipe(RecipeDTO recipe);

        public List<RecipeDTO> GetRecipes(int familyId);

        public List<RecipeIngredientDTO> GetIngredientsFromRecipe(int recipeId); 

    }
}
