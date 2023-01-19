using Microsoft.AspNetCore.Mvc;
using server.DataTransferObj;
using server.Models;
using server.Service.FamilyServices;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyController : ControllerBase
    {
        public readonly IFamilyService _familyService;

        public FamilyController(IFamilyService familyService) {
            this._familyService = familyService;
        }

        [HttpPost("create")]
        public IActionResult CreateFamily(NewFamilyDTO familyDTO)
        {
            try
            {
                _familyService.CreateFamily(familyDTO);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{id}")]
        public IActionResult GetFamily(int id)
        {
            try
            {
                Family family = _familyService.GetFamilyById(id);

                return Ok(family);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
