using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Server.Data;
using Project.Server.Models;

namespace Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdvertisementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/advertisements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertisementsModel>>> GetAdvertisements()
        {
            return await _context.Advertisements.ToListAsync();
        }

        // GET: api/advertisements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertisementsModel>> GetAdvertisement(int id)
        {
            var advertisement = await _context.Advertisements.FindAsync(id);

            if (advertisement == null)
            {
                return NotFound();
            }

            return advertisement;
        }

        // POST: api/advertisements
        [HttpPost]
        public async Task<ActionResult<AdvertisementsModel>> PostAdvertisement(AdvertisementsModel advertisement)
        {
            _context.Advertisements.Add(advertisement);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdvertisement), new { id = advertisement.Id }, advertisement);
        }

        // PUT: api/advertisements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdvertisement(int id, AdvertisementsModel advertisement)
        {
            if (id != advertisement.Id)
            {
                return BadRequest();
            }

            _context.Entry(advertisement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdvertisementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/advertisements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdvertisement(int id)
        {
            var advertisement = await _context.Advertisements.FindAsync(id);
            if (advertisement == null)
            {
                return NotFound();
            }

            _context.Advertisements.Remove(advertisement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdvertisementExists(int id)
        {
            return _context.Advertisements.Any(e => e.Id == id);
        }
    }
}
