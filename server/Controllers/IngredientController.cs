using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DataTransferObj;
using server.Models;
using server.Service.Ingredients;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientsService _IngredientsService; 

        public IngredientController(IIngredientsService IngredientsService)
        {
            this._IngredientsService = IngredientsService;
        }


        //create
        [HttpPost("create")]
        public IActionResult CreateIngredient(Ingredient ingredient) {
            if(ingredient == null)
            {
                return BadRequest(); 
            }
            try
            {
                var val = this._IngredientsService.CreateIngredient(ingredient);

                return CreatedAtAction("GetIngredientById", new{id = val.Id}, ingredient); 


            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }
        //update
        //read
        [HttpGet]
        public IActionResult GetIngredients()
        {
            try
            {
                return Ok(this._IngredientsService.GetAll()); 

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult GetIngredientById(int id)
        {
            return Ok(); 
        }
        //delte
    }
}
