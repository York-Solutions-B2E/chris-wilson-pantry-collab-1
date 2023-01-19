using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Ingredient
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal? Weight { get; set; } //in grams

        [Column(TypeName = "decimal(18, 4)")]
        public decimal? Calories { get; set; }

        
    }
}
