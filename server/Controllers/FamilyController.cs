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
                return Ok(_familyService.CreateFamily(familyDTO));
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

        [HttpGet("friend/{id}")]
        public IActionResult GetFamilyFriends(int id)
        {
            try
            {
                List<FriendsDTO> friends = _familyService.GetFriends(id); 

                return Ok(friends);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
