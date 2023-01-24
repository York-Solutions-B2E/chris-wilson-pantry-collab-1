using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Service.PantryServices;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PantryController : ControllerBase
    {
        private IPantryService _pantryService; 

        public PantryController(IPantryService pantryService)
        {
            _pantryService = pantryService;
        }

        [HttpGet("{id}")]
        public IActionResult GetPantryItems(int id)
        {
            try
            {
                List<Pantry> pantry = this._pantryService.GetPantryItems(id);

                return Ok(pantry);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public IActionResult AddItemToPantry(Pantry pantry)
        {
            try
            {
                _pantryService.AddItemToPantry(pantry);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
