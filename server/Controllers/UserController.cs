using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;
using Microsoft.EntityFrameworkCore;
using server.DataTransferObj;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System.Security.Claims;
using server.Service.Users;

namespace server.Controllers
{
    //[Authorize(Roles = "Admin,SuperAdmin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("create")]
        public IActionResult CreateUser(NewUserDTO newUser)
        {
            try
            {

                int id = _userService.CreateUser(newUser);

                var val = CreatedAtAction("GetUserById", new { Id = id, }, null);

                return val; 
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);  
            }
            
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            //get the user id from the token
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier); 
            
            if(id == null)
            {
                return BadRequest("User isn't logged in."); 
            }

            try
            {
                UserDTO user = _userService.GetUser(Int32.Parse(id));
                return Ok(user);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message); 
            }
             
        }

        [HttpGet("{id:int}")]
        public IActionResult GetUserById(int id) {

            try
            {
                UserDTO user = _userService.GetUser(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
