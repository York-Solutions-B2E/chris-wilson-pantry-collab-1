using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using System.Net.Http.Headers;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        //private readonly IWebHostEnvironment _environment;
        public ImageController()
        {
            //_environment = environment;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] ImageModel model)
        {
            if (ModelState.IsValid)
            {
                var file = model.Image;
                var folderName = Path.Combine("Images");
                Console.WriteLine(folderName); 
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file?.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition)?.FileName?.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }

                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("{fileName}")]
        public IActionResult GetImage(string fileName)
        {
 
            var pathToImageFolder = Path.Combine(Directory.GetCurrentDirectory(), Path.Combine("Images"));
            var fullPath = Path.Combine(pathToImageFolder, fileName);

            var image = System.IO.File.OpenRead(fullPath);
            return File(image, "image/" + Path.GetExtension(fileName).ToLowerInvariant());
        }

    }
}
