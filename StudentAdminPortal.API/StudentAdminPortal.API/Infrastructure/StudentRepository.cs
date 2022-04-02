using Microsoft.EntityFrameworkCore;
using StudentAdminPortal.API.Entities;
using StudentAdminPortal.API.Repositories;

namespace StudentAdminPortal.API.Infrastructure
{
    public class StudentRepository : IStudentRepository
    {
        private readonly StudentAdminContext _dbContext;

        public StudentRepository(StudentAdminContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Student>> GetStudents()
        {
            return await _dbContext.Students
                .Include(nameof(Gender))
                .Include(nameof(Address))
                .ToListAsync();
        }
    }
}
