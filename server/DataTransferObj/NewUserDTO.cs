using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.DataTransferObj
{
    //User data
    public class NewUserDTO
    { 
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public int? FamilyId { get; set; }
    
    }
}
