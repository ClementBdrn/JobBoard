﻿using Microsoft.AspNetCore.Mvc;
using Project.Server.Models;
using System.Text.RegularExpressions;
using Project.Server.Data;
using System;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.Data.SqlClient;

namespace Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplyFormController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApplyFormController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpPost("getInfos")]
        public async Task<IActionResult> GetUserInfo([FromBody] int idPeople)
        {
            try
            {
                var sqlQuery = "SELECT * FROM People WHERE id = @idPeople";
                var user = await _context.People
                    .FromSqlRaw(sqlQuery, new SqlParameter("@idPeople", idPeople))
                    .FirstOrDefaultAsync();

                if (user != null)
                {
                    return Ok(user);
                }

                return NotFound("Utilisateur non trouvé.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erreur interne du serveur : " + ex.Message);
            }
        }


        [HttpPost("sendInfos")]
        public async Task<IActionResult> PostApply([FromBody] ApplyFormWithAdModel applyFormWithAd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {

                applyFormWithAd.Apply.IdAdvertisements = applyFormWithAd.Advertisement.Id;
                _context.Apply.Add(applyFormWithAd.Apply);

                await _context.SaveChangesAsync();

                return Ok(new { message = "Candidature soumise avec succès !" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur lors de la soumission de la candidature : {ex.Message}");
                return StatusCode(500, "Erreur interne du serveur");
            }
        }
    }
}
