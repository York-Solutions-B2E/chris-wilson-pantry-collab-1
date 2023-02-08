using server.Models;

namespace server.DataTransferObj
{
    public class FeedDTO
    {
        public int? Id { get; set; }

        public Family? Family { get; set; }

        public Recipe? Recipe { get; set; }

        public string? Comment { get; set; }

        public DateTime? Posted { get; set; }

    }
}
