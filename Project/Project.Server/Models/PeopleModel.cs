using System.ComponentModel.DataAnnotations;

namespace Project.Server.Models
{
    public class PeopleModel
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        public bool IsEmployed { get; set; }
        public int? IdCompanies { get; set; }
    }
}
