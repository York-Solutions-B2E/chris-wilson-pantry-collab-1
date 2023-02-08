using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Friend
    {
        public int? Id { get; set; }
        [ForeignKey("Family")]
        public int? Family1_Id { get; set; }

        [ForeignKey("Family")]
        public int? Family2_Id { get; set; }

        public DateTime? DateCreated { get; set; }

        public string? Status { get; set; }


    }
}
