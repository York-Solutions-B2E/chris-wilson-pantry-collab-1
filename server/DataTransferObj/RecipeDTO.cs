using server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.DataTransferObj
{
    public class RecipeDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public int? Servings { get; set; }

        public string? Directions { get; set; }

        public int? Family { get; set; }

        public List<RecipeIngredientDTO>? Ingredients { get; set; }
    }
}
