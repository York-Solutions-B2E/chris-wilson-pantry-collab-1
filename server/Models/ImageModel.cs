using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class ImageModel
    {
        [Required]
        public IFormFile? Image { get; set; }
    }
}
