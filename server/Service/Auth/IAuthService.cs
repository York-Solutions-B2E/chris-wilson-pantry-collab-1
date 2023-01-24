using server.DataTransferObj;

namespace server.Service.Auth
{
    public interface IAuthService
    {

        public UserDTO LoginUser(UserLoginDTO userDTO);


    }
}
