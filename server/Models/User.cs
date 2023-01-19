using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    //User data
    public class User
    {
        // the ? indicates that its a nullable value type
        public int Id { get; set; }
        
        public string? Username { get; set; }

        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }

        public string? FirstName { get; set; }

        [ForeignKey("Family")]
        public int? FamilyId { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? LastLoggedIn { get; set; }

    
    }
}
