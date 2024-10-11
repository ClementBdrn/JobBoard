using Microsoft.AspNetCore.Mvc;
using Project.Server.Models;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Project.Server.Data;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Identity;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;
using System.Net;

namespace Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignInController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<CredentialsModel> _passwordHasher;

        public SignInController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _passwordHasher = new PasswordHasher<CredentialsModel>();
        }

        private PasswordVerificationResult VerifyPassword(string credPassword, string password)
        {
            var cred = new CredentialsModel();
            return _passwordHasher.VerifyHashedPassword(cred, credPassword, password);
        }

        [HttpPost]
        public async Task<IActionResult> ReceiveUserData([FromBody] SignInModel model)
        {
            List<string> listError = new List<string>();
            bool isValidate = true;

            string username = model.Username;
            string password = model.Password;

            var sqlCount = "SELECT id, password FROM Credentials WHERE username = '"+username.Trim()+"'";

            try
            {
                var User = await _context.Credentials
                            .FromSqlRaw(sqlCount)
                            .Select(p => new
                            {
                                p.Id,
                                p.Password
                            })
                            .FirstOrDefaultAsync();

                if (User == null)
                {
                    listError.Add("Le nom d'utilisateur renseigné n'existe pas.");
                    isValidate = false;
                }
                else
                {
                    if (VerifyPassword(User.Password, password) != PasswordVerificationResult.Success)
                    {
                        listError.Add("Le mot de passe n'est pas valide.");
                        isValidate = false;
                    }
                }
            }
            catch (Exception ex) { }

            if (isValidate)
            {
                return Ok();
            }
            else
            {
                return BadRequest(new
                {
                    errors = listError
                });
            }
        }
    }
}
