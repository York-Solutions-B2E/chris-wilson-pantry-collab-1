using server.Models;

namespace server.Service.Ingredients
{
    public interface IIngredientsService
    {
        public Ingredient CreateIngredient(Ingredient ingredient);

        public List<Ingredient> GetAll();


    }
}
