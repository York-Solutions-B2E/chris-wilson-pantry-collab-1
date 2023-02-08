using server.Data;
using server.DataTransferObj;
using server.Models;

namespace server.Service
{
    public class FeedService : IFeedService
    {

        private readonly BackendServerContext _context;


        public FeedService(BackendServerContext context)
        {
            _context = context;
        }

        //create feed item 
        public Feed createFeedItem(Feed feedItem)
        {
            try
            {
                _context.Feeds?.Add(feedItem); 
                _context.SaveChanges();

                return feedItem; 

            }catch(Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
           
        }

        public List<FeedDTO> getFeeds(int PageNumber, int PageSize)
        {
            try
            {
                int pageNumber = PageNumber | 1;
                int pageSize = PageSize | 10;
                if(_context.Families != null  && _context.Recipes != null)
                {
                    var results = _context.Feeds?
                                    .Join(_context.Families, feed => feed.FamilyId, family => family.Id, (feed, family) => new {feed, family })
                                    .Join(_context.Recipes, feedFamilies => feedFamilies.feed.RecipeId, recipe => recipe.Id, (feedFamilies, recipe) => new { feedFamilies, recipe })
                                    .OrderBy(x => x.feedFamilies.feed.Posted)
                                    .Skip((pageNumber - 1) * pageSize)
                                    .Take(pageSize)
                                    .Select(x => new FeedDTO {
                                        Id = x.feedFamilies.feed.Id,
                                        Family = x.feedFamilies.family,
                                        Recipe = x.recipe,  //returns an array???
                                        Comment = x.feedFamilies.feed.Comment,
                                        Posted = x.feedFamilies.feed.Posted,

                                      })
                                    .ToList();

                    if (results != null)
                    {
                        
                        return results;
                    }
                    else
                    {
                        throw new Exception("Error loading feed"); 
                    }
                }
                else
                {
                    throw new Exception("Error loading feed");
                }
                

                 
            }catch(Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

        }
    }
}
