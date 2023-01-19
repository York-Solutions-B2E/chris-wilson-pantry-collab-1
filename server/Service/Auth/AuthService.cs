using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DataTransferObj;
using server.Models;
using server.Service.Roles;
using server.Service.Token;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace server.Service.Auth
{
    public class AuthService : IAuthService
    {

        private readonly BackendServerContext _context;
        private readonly ITokenService _tokenServices;
        private readonly IRoleService _roleService;


        public AuthService(BackendServerContext context, ITokenService tokenService, IRoleService roleService)
        {
            _context = context;

            _tokenServices = tokenService;

            _roleService = roleService;
        }

        public JWTTokenResponseDTO LoginUser(UserLoginDTO userDTO)
        {
            try
            {


                //Get a user from the db based on username 
                var user = _context.Users.SingleOrDefault(x => x.Username.Equals(userDTO.UserName));



                //check if you actually got a user
                if (user == null)
                {
                    throw new Exception("User name or password is wrong.");

                    //Unauthorized("Invalid Password");
                }


                var hmac = new HMACSHA512(user.PasswordSalt);

                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));

                //they are byte arrays so each one has to be compared individually 
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != user.PasswordHash[i])
                    {
                        throw new Exception("User name or password is wrong.");
                    }
                }

                //user is verified 
                //up date user last login 
                user.LastLoggedIn = DateTime.UtcNow;
                _context.Update(user);
                _context.SaveChanges();

                //create a list of claims that will be stored in the token
                List<Claim> claims = new List<Claim>();

                //add the user id 
                claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())); 


                //get the roles the user is apart of. 
                List<Role> roles = _roleService.GetRolesByUserId(user.Id);

                foreach (Role role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role.Name));
                }

                //create the token and return it
                return _tokenServices.createToken(claims);


            }catch(DbUpdateException ex)
            {
                //there was a error writing to the database
                throw new Exception(ex.Message, ex);

            }catch(Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

        }
    }
}
