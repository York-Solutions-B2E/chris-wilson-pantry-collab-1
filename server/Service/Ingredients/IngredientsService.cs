using server.Data;
using server.DataTransferObj;
using server.Models;

namespace server.Service.Ingredients
{
    public class IngredientsService : IIngredientsService
    {
        private readonly BackendServerContext _context;


        public IngredientsService(BackendServerContext context)
        {
            _context = context;
        }

        //create
        public Ingredient CreateIngredient(Ingredient ingredient)
        {
            try
            {
                if(ingredient == null )
                {
                    throw new Exception("No Data Sent"); 
                }

               

                _context.Ingredients?.Add(ingredient); 
                _context.SaveChanges();

                return ingredient;

            }catch(Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        //read 
        public List<Ingredient> GetAll()
        {
            var query = from i in _context.Ingredients
                        select new Ingredient
                        {
                            Id = i.Id,
                            Name = i.Name,
                            Description= i.Description,
                            Calories= i.Calories,
                        };

            var ingres = query.ToList();

            return ingres;
        }

    }
}
