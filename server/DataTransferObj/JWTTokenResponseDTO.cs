namespace server.DataTransferObj
{
    public class JWTTokenResponseDTO
    {
        public string? Token { get; set; }

        public DateTime? Expires { get; set; }
    }
}
