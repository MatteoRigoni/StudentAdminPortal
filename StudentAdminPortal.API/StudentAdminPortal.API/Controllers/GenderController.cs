using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentAdminPortal.API.Dtos;
using StudentAdminPortal.API.Repositories;
using Swashbuckle.AspNetCore.Annotations;

namespace StudentAdminPortal.API.Controllers
{
    [ApiController]
    public class GenderController : Controller
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;

        public GenderController(IStudentRepository studentRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("[controller]")]
        [SwaggerOperation(Summary = "Get all possible genders")]
        public async Task<ActionResult<List<Gender>>> GetAllGenders()
        {
            var genders = await _studentRepository.GetGenders();
            return Ok(_mapper.Map<List<Dtos.Gender>>(genders));
        }
    }
}
