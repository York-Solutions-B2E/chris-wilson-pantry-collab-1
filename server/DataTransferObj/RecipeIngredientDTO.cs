using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.DataTransferObj
{
    public class RecipeIngredientDTO
    {

        public int IngredientId { get; set; }

        public decimal Amount { get; set; }
    }
}
