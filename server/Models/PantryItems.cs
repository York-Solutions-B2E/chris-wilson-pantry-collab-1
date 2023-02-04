using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{

    public class PantryItems
    {
        public int Id { get; set; }

        [ForeignKey("Family")]
        public int? FamilyId { get; set; }

        [ForeignKey("Ingredient")]
        public int? Ingredient { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal? Amount { get; set; } //in grams

        public DateTime? Expires { get; set; }
    }
}
