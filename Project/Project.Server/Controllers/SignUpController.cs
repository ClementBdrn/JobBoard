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

            var sqlCount = "SELECT id FROM Credentials WHERE username = '" + username.Trim() + "'";
            var User = await _context.Credentials
                            .FromSqlRaw(sqlCount)
                            .Select(p => p.Id)
                            .FirstOrDefaultAsync();

            if (User != null && User != 0) {
                listError.Add("Le nom d'utilisateur n'est pas disponible.");
                isValidate = false;
            }

            if (isValidate)
            {
                // BDD
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        var sqlPeople = "INSERT INTO People (firstName, lastName, email, phone, birthDate, isEmployed, idCompanies) " +
                        "VALUES (@firstName, @lastName, @email, @phone, @birthDate, 0, null);";

                        // Paramètres SQL
                        var parametersPeople = new[]
                        {
                            new SqlParameter("@firstName", firstName),
                            new SqlParameter("@lastName", lastName),
                            new SqlParameter("@phone", phone),
                            new SqlParameter("@email", email),
                            new SqlParameter("@BirthDate", birthDate)
                        };

                        await _context.Database.ExecuteSqlRawAsync(sqlPeople, parametersPeople);
                        await transaction.CommitAsync();
                    }
                    catch (Exception ex)
                    {
                        await transaction.RollbackAsync();
                        return StatusCode(500, new { error = ex.Message });
                    }
                }

                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        var sqlGetLastId = "SELECT TOP 1 id FROM People ORDER BY id DESC";
                        var idPeople = await _context.People
                            .FromSqlRaw(sqlGetLastId)
                            .Select(p => p.Id)
                            .FirstOrDefaultAsync();

                        var sqlCredentials = "INSERT INTO Credentials (username, password, idPeople, dateModif) VALUES (@username, @password, @idPeople, @dateModif)";

                        // Paramètres SQL
                        var parametersCredentials = new[]
                        {
                            new SqlParameter("@username", username),
                            new SqlParameter("@password", HashPassword(password1)),
                            new SqlParameter("@idPeople", idPeople),
                            new SqlParameter("@dateModif", DateTime.Now)
                        };

                        await _context.Database.ExecuteSqlRawAsync(sqlCredentials, parametersCredentials);
                        await transaction.CommitAsync();

                        // Réponse au frontend
                        return Ok(new { idPeople = idPeople });
                    }
                    catch (Exception ex)
                    {
                        await transaction.RollbackAsync();
                        return StatusCode(500, new { error = ex.Message });
                    }
                }
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
