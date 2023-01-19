using Microsoft.IdentityModel.Tokens;
using server.DataTransferObj;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace server.Service.Token
{
    public class TokenService : ITokenService
    {
        private IConfiguration configuration; //this is to access the data in appsettings.json

        public TokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public JWTTokenResponseDTO createToken(List<Claim> claims)
        {
            var expiresAt = DateTime.Now.AddDays(1); // .AddMinutes(6), 

            //secret key used to generate the signature
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("JWT:Secret")));

            //an object that holds the secret key and the algo
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                //the party that "created" the token and signed it with its private key.
                issuer: configuration.GetValue<string>("JWT:ValidIssuer"),

                //Who should accept this token (this app)
                audience: configuration.GetValue<string>("JWT:ValidAudience"),

                //claims are data that this token will hold (userId and roles)
                claims: claims,

                //when this token expires
                expires: expiresAt,

                //how to encode this token
                signingCredentials: signinCredentials
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            return new JWTTokenResponseDTO
            {
                Token = tokenString,
                Expires = expiresAt
            };

        }
    }
}
