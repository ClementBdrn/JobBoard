using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Server.Data;
using Project.Server.Models;

namespace Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost("disconnect")]
        public async Task ClearToken([FromBody] HomeModel model)
        {
            var sqlDelete = "UPDATE Credentials SET token = NULL, expirationToken = NULL WHERE idPeople = @p0";

            try
            {
                await _context.Database.ExecuteSqlRawAsync(sqlDelete, model.IdPeople);
            }
            catch (Exception ex) { }
        }
    }
}
