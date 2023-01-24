using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DataTransferObj;
using server.Service.RecipeService;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        public readonly IRecipeService _recipeService; 

        public RecipeController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        [HttpPost("create")]
        public IActionResult createRecipe(RecipeDTO recipe)
        {
            try
            {
                _recipeService.CreateRecipe(recipe);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
