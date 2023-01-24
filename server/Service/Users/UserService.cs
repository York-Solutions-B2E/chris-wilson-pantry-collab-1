using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DataTransferObj;
using server.Models;
using server.Service.Token;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace server.Service.Users
{
    public class UserService : IUserService
    {
        private readonly BackendServerContext _context;
        private readonly ITokenService _tokenServices;


        public UserService(BackendServerContext context, ITokenService tokenService)
        {
            _context = context;

            _tokenServices = tokenService;
        }


        public int CreateUser(NewUserDTO userDTO)
        {
            try
            {
                if (userDTO == null)
                {
                    throw new Exception();
                }

                //check if user name exists first
                if (this.CheckIfUsernameExists(userDTO.UserName))
                {
                    throw new Exception("username already exists");
                }

                //user name doesn't exist 

                //hash the password
                //Computes a Hash-based Message Authentication Code (HMAC) using the SHA512 hash function.
                var hmac = new HMACSHA512();

                User user = new User
                {
                    Username = userDTO.UserName,
                    Email = userDTO.Email,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password)),
                    PasswordSalt = hmac.Key,
                    FirstName = userDTO.FirstName,
                    FamilyId = userDTO.FamilyId,

                };

                user.CreatedDate = DateTime.UtcNow;

                _context.Users?.Add(user);
                _context.SaveChanges();

                return user.Id; 

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }


        }

        public UserDTO GetUser(int Id)
        {

            var query = from u in _context.Users
                        join f in _context.Families on u.FamilyId equals f.Id
                        where u.Id == Id
                        select new UserDTO
                        {
                            Username = u.Username,
                            FirstName = u.FirstName,
                            LastLoggedIn= u.LastLoggedIn,
                            FamilyName = f.FamilyName,
                            FamilyId = f.Id,
                            Created = f.Created,
                            Title = f.Title,
                        };
            var user = query.FirstOrDefault(); 
            
            //check if null
            if(user == null)
            {
                throw new Exception("User doesn't exist."); 
            }
            
            return user;
        }


        public bool CheckIfUsernameExists(string username)
        {
            /*var query = from u in _context.Users
                        where u.Username == username
                        select u;
            var result = query.FirstOrDefault(); */

            var user = _context.Users?.SingleOrDefault(x => x.Username.Equals(username));

            if (user == null)
            {
                return false; //no user with that username has been found
            }

            return true;
        }


    }
}
