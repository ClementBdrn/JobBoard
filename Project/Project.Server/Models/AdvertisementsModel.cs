namespace Project.Server.Models
{
    public class AdvertisementsModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Place { get; set; }
        public string? Contract { get; set; }
        public string? Description { get; set; }
        public string? Skills { get; set; }
        public DateTime? DatePost { get; set; }
        public int idCompanies { get; set; }
        public string? Salary { get; set; }
    }
}
