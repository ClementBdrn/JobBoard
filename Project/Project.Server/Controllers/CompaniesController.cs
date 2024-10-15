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
    }
}
