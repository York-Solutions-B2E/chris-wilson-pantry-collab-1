using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Friend
    {
        public int Id { get; set; }
        [ForeignKey("Family")]
        public int FamilyId { get; set; }

        [ForeignKey("Family")]
        public int FriendID { get; set; }

        public DateTime DateCreated { get; set; }


    }
}
