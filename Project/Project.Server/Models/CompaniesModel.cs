using System.ComponentModel.DataAnnotations;

namespace Project.Server.Models
{
    public class CompaniesModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Place { get; set; }
        public string? Description { get; set; }
    }
}
