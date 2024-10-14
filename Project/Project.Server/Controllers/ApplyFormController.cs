using Microsoft.AspNetCore.Mvc;
using Project.Server.Models;
using System.Text.RegularExpressions;
using Project.Server.Data;
using System;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApplyController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertisementsModel>>> GetAdvertisements()
        {
            try
            {
                var advertisements = await _context.Advertisements.ToListAsync();
                return Ok(advertisements);
            }
            catch (Exception ex)
            {
                // Enregistre l'erreur dans les logs ou la console
                Console.WriteLine($"Erreur : {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostApply([FromBody] ApplyFormModel apply)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Applies.Add(apply);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Candidature soumise avec succès !" });
            }
            catch (Exception ex)
            {
                // Journaliser l'erreur
                Console.WriteLine($"Erreur lors de la soumission de la candidature : {ex.Message}");
                return StatusCode(500, "Erreur interne du serveur");
            }
        }
    }
}
