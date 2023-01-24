using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.DataTransferObj;
using server.Models;
using server.Service;
using server.Service.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthenticationController : ControllerBase
    {
        private IAuthService _authService; 
        public AuthenticationController(IAuthService authService) { 
            
            this._authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDTO user)
        {
            if (user is null)
            {
                return BadRequest("Invalid user request!!!");
            }

            try
            {
                //attempt to get a token
                UserDTO token = _authService.LoginUser(user); 

                return Ok(token); 

            }catch(Exception ex)
            {
                //failed to get a token
                return BadRequest(ex.Message);
            }


        }
    }
}
