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

        public async Task<Student> DeleteStudent(Guid id)
        {
            var student = _dbContext.Students.Single(s => s.Id == id);
            if (student != null)
            {
                _dbContext.Students.Remove(student);
                await _dbContext.SaveChangesAsync();
                return student;
            }
            return null;
        }

        public async Task<bool> ExistsStudentById(Guid id)
        {
            return await _dbContext.Students.AnyAsync(s => s.Id == id);
        }

        public async Task<List<Gender>> GetGenders()
        {
            return await _dbContext.Genders.ToListAsync();
        }

        public async Task<Student> GetStudentById(Guid id)
        {
            return await _dbContext.Students
                .Include(nameof(Gender))
                .Include(nameof(Address))
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<List<Student>> GetStudents()
        {
            return await _dbContext.Students
                .Include(nameof(Gender))
                .Include(nameof(Address))
                .ToListAsync();
        }

        public async Task<Student> UpdateStudent(Guid id, Student request)
        {
            var existingStudent = await GetStudentById(id);
            if (existingStudent != null)
            {
                existingStudent.FirstName = request.FirstName;
                existingStudent.LastName = request.LastName;
                existingStudent.DateOfBirth = request.DateOfBirth;
                existingStudent.Email = request.Email;
                existingStudent.Mobile = request.Mobile;
                existingStudent.GenderId = request.GenderId;
                existingStudent.Address.PhysicalAddress = request.Address.PhysicalAddress;
                existingStudent.Address.PostalAddress = request.Address.PostalAddress;

                await _dbContext.SaveChangesAsync();
                return existingStudent;
            }

            return null;
        }
    }
}
