using server.DataTransferObj;
using System.Security.Claims;

namespace server.Service.Token
{
    public interface ITokenService
    {

        public JWTTokenResponseDTO createToken(List<Claim> claims);


    }
}
