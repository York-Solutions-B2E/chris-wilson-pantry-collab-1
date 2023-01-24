using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class AddedpantryandchangedIngredients : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IngredientData");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Ingredients");

            migrationBuilder.AddColumn<int>(
                name: "servings",
                table: "Recipes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Ingredients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsLiquid",
                table: "Ingredients",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "servings",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "IsLiquid",
                table: "Ingredients");

            migrationBuilder.AddColumn<decimal>(
                name: "Weight",
                table: "Ingredients",
                type: "decimal(18,4)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "IngredientData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsLiquid = table.Column<bool>(type: "bit", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VolumeCupGrams = table.Column<decimal>(type: "decimal(10,5)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IngredientData", x => x.Id);
                });
        }
    }
}
