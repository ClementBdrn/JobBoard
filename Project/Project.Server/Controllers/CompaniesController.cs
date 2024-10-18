using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Server.Data;
using Project.Server.Models;
using System.Collections.Generic;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Project.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CompaniesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompaniesModel>>> GetCompanies()
        {
            // Récupérer toutes les entreprises de la base de données
            var companies = await _context.Companies.ToListAsync();
            return Ok(companies);
        }

        [HttpPost]
        public async Task<ActionResult<CompaniesModel>> PostCompany(CompaniesModel companies)
        {
            _context.Companies.Add(companies);
            await _context.SaveChangesAsync();

            return Ok(new { id = companies.Id });
        }

        // PUT: api/advertisements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanies(int id, CompaniesModel companies)
        {
            if (id != companies.Id)
            {
                return BadRequest();
            }

            _context.Entry(companies).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompaniesExist(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            // Récupérer toutes les publicités liées à cette entreprise
            var advertisements = await _context.Advertisements.Where(ad => ad.idCompanies == id).ToListAsync();

            // Supprimer les likes associés aux publicités
            if (advertisements.Any())
            {
                foreach (var advertisement in advertisements)
                {
                    var advertisementLikes = _context.Advertisements_Like.Where(like => like.IdAdvertisements == advertisement.Id).ToList();
                    if (advertisementLikes.Any())
                    {
                        _context.Advertisements_Like.RemoveRange(advertisementLikes);
                    }

                    var applies = _context.Applies.Where(apply => apply.IdAdvertisements == advertisement.Id).ToList();
                    if (applies.Any())
                    {
                        _context.Applies.RemoveRange(applies);
                    }
                }

                await _context.SaveChangesAsync();

                _context.Advertisements.RemoveRange(advertisements);
            }

            var people = await _context.People.Where(p => p.IdCompanies == id).ToListAsync();
            if (people.Any())
            {
                foreach (var person in people)
                {
                    person.IsEmployed = false;
                    person.IdCompanies = null;
                }
            }

            _context.Companies.Remove(company);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Gérer l'exception si nécessaire
                var errorMessage = ex.Message;
                return StatusCode(500, "Erreur lors de la suppression de l'entreprise: " + errorMessage);
            }

            return NoContent(); // Indiquer que l'opération s'est bien déroulée
        }

        private bool CompaniesExist(int id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
    }
}
