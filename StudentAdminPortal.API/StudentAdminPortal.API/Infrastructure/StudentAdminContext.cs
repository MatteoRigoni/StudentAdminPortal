using Microsoft.EntityFrameworkCore;
using StudentAdminPortal.API.Entities;

namespace StudentAdminPortal.API.Infrastructure
{
    public class StudentAdminContext : DbContext
    {
        public StudentAdminContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Gender> Genders { get; set; }
    }
}
