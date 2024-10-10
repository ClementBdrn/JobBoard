using Microsoft.AspNetCore.Mvc;
using Project.Server.Models;
using System.Text.RegularExpressions;
using Project.Server.Data;

namespace Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplyFormController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApplyFormController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost]
        public async Task<IActionResult> ReceiveUserData([FromBody] ApplyFormModel model)
        {
            List<string> listError = new List<string>();
            bool isValidate = true;

            string firstName = model.Firstname;
            string name = model.Name;
            string email = model.Email;
            string phone = model.Phone;
            string address = model.Address;

            Regex regex = new Regex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            if (!regex.IsMatch(email))
            {
                listError.Add("L'email n'est pas valide.");
                isValidate = false;
            }

            if (firstName.Trim() == "")
            {
                listError.Add("Vous devez rentrer un Prénom");
                isValidate = false;
            }

            if (name.Trim() == "")
            {
                listError.Add("Vous devez rentrer un Nom");
                isValidate = false;
            }

            //if (isValidate)
            //{
            //    // BDD
            //    var newPerson = new PeopleModel
            //    {
            //        FirstName = firstName,
            //        LastName = name,
            //        Email = email,
            //        Phone = phone,
            //        //address
            //        IsEmployed = false,
            //        IdCompanies = null
            //    };

            //    _context.People.Add(newPerson);
            //    await _context.SaveChangesAsync();
            //    int newPersonId = newPerson.Id;

            //    // Paramètres SQL
            //    var credentials = new CredentialsModel
            //    {
            //        Username = username,
            //        Password = HashPassword(password1),
            //        IdPeople = newPersonId,
            //        DateModif = DateTime.Now
            //    };

            //    _context.Credentials.Add(credentials);
            //    await _context.SaveChangesAsync();

            //    // Réponse au frontend
            //    return Ok(new { newPersonId });
            //}
            //else
            //{
            //    return BadRequest(new
            //    {
            //        errors = listError
            //    });
            //}

            return Ok(new { name });
        }
    }
}
