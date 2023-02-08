using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace server.Service.RedditServices
{
    public class RedditService
    {
        private readonly HttpClient _httpClient;

        public RedditService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async void GetLatestPosts() //doing async here because this could take a while
        {
            var response = await _httpClient.GetAsync("https://www.reddit.com/r/recipes/.json");
            var content = await response.Content.ReadAsStringAsync();
            var redditResponse = JsonConvert.DeserializeObject<RedditResponse>(content);

            if(redditResponse != null)
            {
                foreach (var post in redditResponse.Data.Children)
                {
                    var postId = post.Data.Id;
                    var postTitle = post.Data.Title;
                    var postImageUrl = post.Data.Preview.Images.FirstOrDefault()?.Source?.Url;

                    // make another API request to get the comments of this post
                    // ...

                    // process the comments
                    // ...
                }
            }
            

            //return new OkObjectResult(redditResponse.Data.Children);
        }

        public class RedditResponse
        {
            public Data? Data { get; set; }
        }

        public class Data
        {
            public Child[]? Children { get; set; }
        }

        public class Child
        {
            public string Kind { get; set; }
            public PostData Data { get; set; }
        }
        
        public class Preview
        {
            public ImageObj[] Images { get; set; }
        }

        public class ImageObj
        {
            public Source Source { get; set; }
        }

        public class Source
        {
            public int Height { get; set; }
            public string Url { get; set; }
            public int Width { get; set; }
        }

        public class PostData
        {
            public string Title { get; set; }
            public string Url { get; set; }
            public CommentData[] Comments { get; set; }
            public object Id { get; internal set; }
            public Preview Preview { get; set; }
        }

        

        public class CommentData
        {
            public string Body { get; set; }
        }
    }
}
