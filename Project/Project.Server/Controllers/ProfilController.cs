using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Server.Data;
using Project.Server.Models;

namespace Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfilController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfilController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost]
        public async Task<IActionResult> ReceiveUserData([FromBody] ProfilModel model)
        {
            var sqlCount = "SELECT * FROM People WHERE id = " + model.IdPeople;

            PeopleModel user = null;
            try
            {
                user = await _context.People
                .FromSqlRaw(sqlCount)
                .FirstOrDefaultAsync();

                if (user != null)
                {
                    return Ok(new { user });
                }
            }
            catch (Exception ex) { }

            return BadRequest();
        }
    }
}
