using server.Models;

namespace server.Service.PantryServices
{
    public interface IPantryService
    {
        public void AddItemToPantry(Pantry pantry);


        public List<Pantry> GetPantryItems(int id);

    }
}
