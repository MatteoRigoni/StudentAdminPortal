using StudentAdminPortal.API.Entities;

namespace StudentAdminPortal.API.Repositories
{
    public interface IStudentRepository
    {
        Task<List<Student>> GetStudents();
        Task<Student> GetStudentById(Guid id);
        Task<List<Gender>> GetGenders();
        Task<bool> ExistsStudentById(Guid id);
        Task<Student> UpdateStudent(Guid id, Student request);
        Task<Student> DeleteStudent(Guid id);
        Task<Student> AddStudent(Student request);
        Task<bool> UpdateProfileImage(Guid studentId, string profileImageUrl);
    }
}
