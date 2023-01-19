using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class IngredientData
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }


        //Volume per gram 
        //example all purpose floor is 1 cup equals 120 grams
        [Column(TypeName = "decimal(10, 5)")]
        public decimal? VolumeCupGrams { get; set; } 

        public bool? IsLiquid { get; set; }

    }
}
