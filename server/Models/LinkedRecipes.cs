namespace server.Models
{
    public class LinkedRecipes
    {
        public int Id { get; set; }

        public int? FamilyId { get; set; }

        public int RecipeId { get; set; }

        public int? Relationship { get; set; }
    }
}
