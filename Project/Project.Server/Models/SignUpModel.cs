namespace Project.Server.Models
{
    public class SignUpModel
    {
        public string? Name { get; set; }
        public string? Username { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Password1 { get; set; }
        public string? Password2 { get; set; }
    }
}
