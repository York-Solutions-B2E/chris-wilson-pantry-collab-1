namespace server.Models
{
    public class FriendRequest
    {
        public int Id { get; set; }

        public int FromId { get; set; }

        public int ToId { get; set; }
        public DateTime date { get; set; }

    }
}
