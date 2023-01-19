using Microsoft.AspNetCore.Mvc;
using server.DataTransferObj;
using server.Models;

namespace server.Service.Users
{
    public interface IUserService
    {
        public int CreateUser(NewUserDTO userDTO);

        public UserDTO GetUser(int Id);


    }
}
