using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Server.Data;
using Project.Server.Models;

namespace Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FavoritesController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost]
        public async Task<ActionResult> AddFavorite([FromBody] Advertisements_LikeModel favoriteModel)
        {
            // Vérifier si le modèle est null ou si les propriétés IdPeople et IdAdvertisements sont null ou inférieures ou égales à 0
            if (favoriteModel == null || favoriteModel.IdPeople <= 0 || favoriteModel.IdAdvertisements <= 0)
            {
                return BadRequest("Les données fournies sont incorrectes.");
            }

            try
            {
                // Vérifier si l'utilisateur a déjà liké cette annonce
                var existingFavorite = await _context.Advertisements_Like
                    .FirstOrDefaultAsync(al => al.IdPeople == favoriteModel.IdPeople && al.IdAdvertisements == favoriteModel.IdAdvertisements);

                if (existingFavorite != null)
                {
                    return BadRequest("L'utilisateur a déjà liké cette annonce.");
                }

                // Créer une nouvelle entrée dans la table des likes
                var newFavorite = new Advertisements_LikeModel
                {
                    IdAdvertisements = favoriteModel.IdAdvertisements,
                    IdPeople = favoriteModel.IdPeople
                };

                // Ajouter le nouvel objet à la base de données
                _context.Advertisements_Like.Add(newFavorite);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Favori ajouté avec succès." });
            }
            catch (Exception ex)
            {
                // Enregistre l'erreur dans les logs ou la console
                Console.WriteLine($"Erreur : {ex.Message}");
                return StatusCode(500, "Erreur lors de l'ajout aux favoris.");
            }
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertisementsModel>>> GetFavorites()
        {
            try
            {
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        var advertisementsLikeIds = await _context.Advertisements_Like
                            .Select(al => al.IdAdvertisements)
                            .ToListAsync();

                        if (advertisementsLikeIds.Count() == 0)
                        {
                            return Ok(new List<AdvertisementsModel>());
                        }

                        var advertisements = await _context.Advertisements
                            .Where(ad => advertisementsLikeIds.Contains(ad.Id))
                            .OrderByDescending(ad => ad.DatePost)
                            .ToListAsync();

                        await transaction.CommitAsync();

                        return Ok(advertisements);
                    }
                    catch (Exception ex)
                    {
                        await transaction.RollbackAsync();
                        return StatusCode(500, new { error = ex.Message });
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur : {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpDelete("{idAdvertisements}")]
        public async Task<ActionResult> DeleteFavorite(int idAdvertisements, int idPeople)
        {
            try
            {
                // Chercher l'entrée dans la table des likes avec l'IdAdvertisements et IdPeople
                var favorite = await _context.Advertisements_Like
                    .FirstOrDefaultAsync(al => al.IdAdvertisements == idAdvertisements && al.IdPeople == idPeople);

                if (favorite == null)
                {
                    return NotFound("Le favori n'a pas été trouvé.");
                }

                // Supprimer le favori
                _context.Advertisements_Like.Remove(favorite);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Favori supprimé avec succès." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur : {ex.Message}");
                return StatusCode(500, "Erreur lors de la suppression du favori.");
            }
        }
    }
}
