using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Service;
using server.Service.Auth;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {

        private IFeedService _feedService;
        public FeedController(IFeedService feedService)
        {

            this._feedService = feedService;
        }

        [HttpGet]
        public ActionResult getFeeds() {
            try
            {
                return Ok(this._feedService.getFeeds(1, 10));

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
