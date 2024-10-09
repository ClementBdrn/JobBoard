using System.ComponentModel.DataAnnotations;

namespace Project.Server.Models
{
    public class CredentialsModel
    {
        [Key]
        public int Id { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
        public int IdPeople { get; set; }
        public DateTime DateModif {  get; set; }
    }
}
