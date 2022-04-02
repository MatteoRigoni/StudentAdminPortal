using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentAdminPortal.API.Entities;
using StudentAdminPortal.API.Repositories;
using Swashbuckle.AspNetCore.Annotations;

namespace StudentAdminPortal.API.Controllers
{
    [ApiController]
    public class StudentController : Controller
    {
        private readonly IStudentRepository _studentRepo;
        private readonly IMapper _mapper;

        public StudentController(IStudentRepository studentRepo, IMapper mapper)
        {
            _studentRepo = studentRepo;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("[controller]")]
        [SwaggerOperation(Summary = "Returns all student with gender, address info")]
        public async Task<ActionResult<List<Dtos.Student>>> GetAllStudents()
        {
            var students = await _studentRepo.GetStudents();
            return Ok(_mapper.Map<List<Dtos.Student>>(students));
        }
    }
}
