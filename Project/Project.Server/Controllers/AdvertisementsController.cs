using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Server.Data;
using Project.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdvertisementsController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // GET: api/advertisements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertisementsModel>>> GetAdvertisements()
        {
            try
            {
                var advertisements = await (from ad in _context.Advertisements
                                            join company in _context.Companies
                                            on ad.idCompanies equals company.Id into adCompany
                                            from c in adCompany.DefaultIfEmpty()
                                            select new
                                            {
                                                ad.Id,
                                                ad.Name,
                                                ad.Place,
                                                ad.Contract,
                                                ad.Description,
                                                ad.DatePost,
                                                ad.Skills,
                                                ad.Salary,
                                                companyName = c != null ? c.Name : null
                                            })
                                            //.OrderByDescending(ad => ad.
                                            .ToListAsync();


                return Ok(advertisements);
            }
            catch (Exception ex)
            {
                // Enregistre l'erreur dans les logs ou la console
                Console.WriteLine($"Erreur : {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // Ajoutez ceci à votre classe AdvertisementsController
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<AdvertisementsModel>>> SearchAdvertisements(string searchTerm)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(searchTerm))
                {
                    var allAdvertisements = await _context.Advertisements.ToListAsync();
                    return Ok(allAdvertisements);
                }

                var advertisements = await _context.Advertisements
                    .Where(a => a.Name.Contains(searchTerm)) // Assurez-vous que "Name" est une propriété de votre modèle
                    .ToListAsync();

                return Ok(advertisements);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur lors de la recherche : {ex.Message}");
                return StatusCode(500, "Erreur interne du serveur");
            }
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
