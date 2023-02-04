namespace server.Models
{
    public class Family
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? FamilyName { get; set; }

        public DateTime? Created { get; set; }

        public ICollection<Recipe>? Recipes { get; set; }
    }
}
