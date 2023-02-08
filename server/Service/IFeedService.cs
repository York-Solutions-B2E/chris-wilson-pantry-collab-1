using server.DataTransferObj;
using server.Models;

namespace server.Service
{
    public interface IFeedService
    {
        public Feed createFeedItem(Feed feedItem);

        public List<FeedDTO> getFeeds(int PageNumber, int PageSize);
    }
}
