using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project.Server.Data;
using Project.Server.Models;

namespace Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController
    {
        private readonly ApplicationDbContext _context;

        public FavoritesController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost]
        public async Task<IActionResult> ReceiveUserData([FromBody] FavoritesModel model)
        {
            //return Ok();
        }
    }
}
