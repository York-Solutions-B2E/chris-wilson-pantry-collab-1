using server.Models;

namespace server.Service.PantryServices
{
    public interface IPantryService
    {
        public void AddItemToPantry(PantryItems pantryItems);


        public List<PantryItems> GetPantryItems(int id);

    }
}
