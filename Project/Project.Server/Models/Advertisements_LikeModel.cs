using System.ComponentModel.DataAnnotations;

namespace Project.Server.Models
{
    public class Advertisements_LikeModel
    {
        [Key]
        public int Id {  get; set; }
        public int idPeople { get; set; }
        public int idAdvertisements { get; set; }
    }
}
