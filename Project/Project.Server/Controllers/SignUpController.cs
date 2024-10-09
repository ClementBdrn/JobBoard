using Microsoft.AspNetCore.Mvc;
using Project.Server.Models;

namespace Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignUpController : ControllerBase
    {
        [HttpPost]
        public IActionResult ReceiveUserData([FromBody] SignUpModel model)
        {
            string email = model.Email;
            string password = model.Password1;
    


            // Réponse au frontend
            return Ok(new { message = "Données utilisateur reçues avec succès.", user = model });
        }
    }
}
