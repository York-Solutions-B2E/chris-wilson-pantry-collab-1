using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DataTransferObj;
using server.Models;
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

        //create
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

        //read
        [HttpGet("family/{id}")]
        public IActionResult getRecipe(int id)
        {
            try
            {
                return Ok(_recipeService.GetRecipes(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("short/{id}")]
        public IActionResult GetRecipeShort(int id)
        {
            try
            {
                return Ok(_recipeService.GetRecipeShorts(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
