using Microsoft.EntityFrameworkCore;
using Project.Server.Models;

namespace Project.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<CredentialsModel> Credentials { get; set; }
        public DbSet<PeopleModel> People { get; set; }
        public DbSet<AdvertisementsModel> Advertisements { get; set; }
    }
}
