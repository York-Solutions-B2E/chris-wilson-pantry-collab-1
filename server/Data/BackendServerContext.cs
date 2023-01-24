using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class BackendServerContext : DbContext
    {

        public BackendServerContext(DbContextOptions<BackendServerContext> options) : base(options) { }

        public DbSet<User>? Users { get; set; }
        public DbSet<Role>? Roles { get; set; }
        public DbSet<UserRole>? UserRoles { get; set; }
        public DbSet<Family>? Families { get; set; }
        public DbSet<Friend>? Friends { get; set; }
        public DbSet<FriendRequest>? FriendRequests { get; set; }
        public DbSet<Ingredient>? Ingredients { get; set; }
        public DbSet<Recipe>? Recipes { get; set; }
        public DbSet<RecipeIngredient>? RecipeIngredients { get; set; }
        public DbSet<Pantry>? Pantries { get; set; }
       
    

    }
}
