using server.DataTransferObj;

namespace server.Service.Auth
{
    public interface IAuthService
    {

        public JWTTokenResponseDTO LoginUser(UserLoginDTO userDTO);


    }
}
