namespace server.DataTransferObj
{
    public class UserDTO
    {

        public string? Username { get; set; }

        public string? FirstName { get; set; }

        public DateTime? LastLoggedIn { get; set; }

        //family 
        public string? FamilyName { get; set; }
        public int? FamilyId { get; set; }

        public DateTime? Created { get; set; }

        public string? Title { get; set; }

        //token info 
        public JWTTokenResponseDTO? Token { get; set; }
        
    }
}
