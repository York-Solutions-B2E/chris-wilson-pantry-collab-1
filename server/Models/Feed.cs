namespace server.Models
{
    public class Feed
    {

        public int? Id { get; set; }

        public int? FamilyId { get; set; }

        public int? RecipeId { get; set; }

        public string? Comment { get; set; }

        public DateTime? Posted { get; set; }

    }
}
