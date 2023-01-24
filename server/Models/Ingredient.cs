using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Ingredient
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal? Calories { get; set; } //per gram


    }
}


/*
 * If your digital scale does not have a “convert grams'' function, 
 * you can simply multiply the volume measurement of fluid ounces by 28.34952. 
 * The product will give you a precise gram measurement which you can then 
 * adjust to the nearest decimal point. 
 */
