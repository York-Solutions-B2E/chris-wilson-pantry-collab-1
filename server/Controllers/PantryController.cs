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
        private readonly IPantryService _pantryService; 

        public PantryController(IPantryService pantryService)
        {
            _pantryService = pantryService;
        }

        [HttpGet("{id}")]
        public IActionResult GetPantryItems(int id)
        {
            try
            {
                List<PantryItems> pantry = this._pantryService.GetPantryItems(id);

                return Ok(pantry);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public IActionResult AddItemToPantry(PantryItems pantryItems)
        {
            try
            {
                _pantryService.AddItemToPantry(pantryItems);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut()]
        public IActionResult UpdatePantryItem(PantryItems pantryItems)
        {
            try
            {
                _pantryService.UpdatePantryItem(pantryItems);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
