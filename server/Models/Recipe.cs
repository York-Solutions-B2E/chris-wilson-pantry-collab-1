using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace server.Models
{
    public class Recipe
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public string? Directions { get; set; }

        [ForeignKey("Family")]
        public int? Family { get; set; }
    }
}
