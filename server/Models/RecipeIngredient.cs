using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class RecipeIngredient
    {
        public int Id { get; set; }

        [ForeignKey("Recipe")]
        public int RecipeId { get; set; }
        
        [ForeignKey("Ingredients")]
        public int IngredientId { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal Weight { get; set; }
    }
}
