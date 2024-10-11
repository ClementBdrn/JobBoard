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

            int idPeople = 0;
            PeopleModel people = null;
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

                var sqlPeople = "SELECT * FROM People WHERE id = '"+User.Id+"'";

                var People = await _context.People
                            .FromSqlRaw(sqlPeople)
                            .Select(p => new
                            {
                                p.Id,
                                p.FirstName,
                                p.LastName,
                                p.Email,
                                p.Phone
                            })
                            .FirstOrDefaultAsync();

                if (User == null)
                {
                    listError.Add("Le nom d'utilisateur renseigné n'existe pas.");
                    isValidate = false;
                }
                if (People == null)
                {
                    listError.Add("Ce people n'existe pas.");
                    isValidate = false;
                }
                else
                {
                    idPeople = User.Id;
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
                Console.WriteLine(people);
                return Ok(new { idPeople,  people });
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
