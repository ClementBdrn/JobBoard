using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Server.Data;
using Project.Server.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignInController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<CredentialsModel> _passwordHasher;
        private readonly IConfiguration _configuration;

        public SignInController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _passwordHasher = new PasswordHasher<CredentialsModel>();
            _configuration = configuration;
        }

        private PasswordVerificationResult VerifyPassword(string credPassword, string password)
        {
            var cred = new CredentialsModel();
            return _passwordHasher.VerifyHashedPassword(cred, credPassword, password);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> ReceiveUserData([FromBody] SignInModel model)
        {
            List<string> listError = new List<string>();
            bool isValidate = true;

            string username = model.Username;
            string password = model.Password;

            var sqlCount = "SELECT * FROM Credentials WHERE username = '"+username.Trim()+"'";

            int idPeople = 0;
            CredentialsModel user = null;
            try
            {
                user = await _context.Credentials
                    .FromSqlRaw(sqlCount)
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    listError.Add("Le nom d'utilisateur renseigné n'existe pas.");
                    isValidate = false;
                }
                else
                {
                    idPeople = user.Id;
                    if (VerifyPassword(user.Password, password) != PasswordVerificationResult.Success)
                    {
                        listError.Add("Le mot de passe n'est pas valide.");
                        isValidate = false;
                    }
                }
            }
            catch (Exception ex) 
            {
                listError.Add("Erreur interne.");
                isValidate = false;
            }

            if (isValidate)
            {
                var token = GenerateJwtToken(user.Id);

                user.Token = token;
                user.ExpirationToken = DateTime.Now.AddMinutes(1440);

                _context.Credentials.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new { idPeople = idPeople, token = token });
            }
            else
            {
                return BadRequest(new
                {
                    errors = listError
                });
            }
        }

        [HttpPost("verifyToken")]
        public async Task<IActionResult> VerifyToken([FromHeader(Name = "Authorization")] string authorization)
        {
            if (string.IsNullOrEmpty(authorization) || !authorization.StartsWith("Bearer "))
            {
                return Unauthorized();
            }

            var token = authorization.Substring("Bearer ".Length).Trim();

            // Vérifier la validité du token
            var idPeopleToken = await VerifyJwtToken(token);

            if (Convert.ToInt32(idPeopleToken) == 0)
            {
                return Unauthorized();
            }

            return Ok(new { idPeople = idPeopleToken });
        }

        private async Task<int> VerifyJwtToken(string token) { 

            var sqlCount = "SELECT TOP 1 * FROM Credentials WHERE token = '" + token.Trim() + "'";

            int idPeople = 0;
            CredentialsModel user = null;
            try
            {
                user = await _context.Credentials
                .FromSqlRaw(sqlCount)
                .FirstOrDefaultAsync();

                if (user != null)
                {
                    if(DateTime.Now <= user.ExpirationToken)
                    {
                        idPeople = user.IdPeople;
                    }                   
                }
            }
            catch (Exception ex) { }

            return idPeople;
        }

        private string GenerateJwtToken(int userId)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "https://localhost:7007",
                audience: "https://localhost:5173",
                claims: new[] { new Claim("id", userId.ToString()) },
                expires: DateTime.Now.AddHours(24),
                signingCredentials: creds);

            try
            {
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return new JwtSecurityTokenHandler().WriteToken(token);
            }

        }
    }
}
