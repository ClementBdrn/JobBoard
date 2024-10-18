using System.ComponentModel.DataAnnotations;

namespace Project.Server.Models
{
    public class ApplyFormModel
    {
        [Key]
        public int Id { get; set; }
        public int IdPeople { get; set; }
        public int IdAdvertisements { get; set; }
        public byte[]? FileCV { get; set; }
        public string? NameCV { get; set; }
        public byte[]? FileLM { get; set; }
        public string? NameLM { get; set; }
        public DateTime DateSend { get; set; }
    }

    public class ApplyFormWithAdModel
    {
        public ApplyFormModel Apply { get; set; }
        public AdvertisementsModel Advertisement { get; set; }
    }
}
