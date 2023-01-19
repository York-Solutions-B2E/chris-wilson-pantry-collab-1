using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    //Table for connecting users to roles
    public class UserRole
    {
        //this is here beause composite keys are only in version 7
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }

        [ForeignKey("Role")]
        public int RoleID { get; set; }

    }
}
