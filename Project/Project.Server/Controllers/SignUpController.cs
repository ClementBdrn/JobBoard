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
    public class SignUpController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<CredentialsModel> _passwordHasher;

        public SignUpController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _passwordHasher = new PasswordHasher<CredentialsModel>();
        }

        private string HashPassword(string password)
        {
            var cred = new CredentialsModel();
            return _passwordHasher.HashPassword(cred, password);
        }

        [HttpPost]
        public async Task<IActionResult> ReceiveUserData([FromBody] SignUpModel model)
        {
            List<string> listError = new List<string>();
            bool isValidate = true;

            string firstName = model.Name.Split(' ')[0];
            string lastName = "";
            try {
                lastName = model.Name.Split(' ')[1];
            }
            catch { }

            string username = model.Username;
            DateTime birthDate = (DateTime)model.BirthDate;
            string phone = model.Phone;
            string email = model.Email;
            string password1 = model.Password1;
            string password2 = model.Password2;

            if (password1 != password2)
            {
                listError.Add("Les mots de passes doivent être identiques.");
                isValidate = false;
            }

            Regex regex = new Regex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            if (!regex.IsMatch(email)) {
                listError.Add("L'email n'est pas valide.");
                isValidate = false;
            }
            
            if (birthDate > DateTime.Now.AddYears(-16))
            {
                listError.Add("Seuls les personnes d'au moins 16 ans peuvent s'inscrire.");
                isValidate = false;
            }

            if (lastName.Trim() == "")
            {
                listError.Add("Vous devez rentrer un Prénom et un Nom");
                isValidate = false;
            }

            if (isValidate)
            {
                // BDD
                var newPerson = new PeopleModel
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    Phone = phone,
                    BirthDate = birthDate,
                    IsEmployed = false,
                    IdCompanies = null
                };

                _context.People.Add(newPerson);
                await _context.SaveChangesAsync();
                int newPersonId = newPerson.Id;

                // Paramètres SQL
                var credentials = new CredentialsModel
                {
                    Username = username,
                    Password = HashPassword(password1),
                    IdPeople = newPersonId,
                    DateModif = DateTime.Now
                };

                _context.Credentials.Add(credentials);
                await _context.SaveChangesAsync();

                // Réponse au frontend
                return Ok(new { newPersonId });
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
