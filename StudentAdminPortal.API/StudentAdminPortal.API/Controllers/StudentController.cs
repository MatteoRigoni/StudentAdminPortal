using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentAdminPortal.API.Dtos;
using StudentAdminPortal.API.Entities;
using StudentAdminPortal.API.Repositories;
using Swashbuckle.AspNetCore.Annotations;

namespace StudentAdminPortal.API.Controllers
{
    [ApiController]
    public class StudentController : Controller
    {
        private readonly IStudentRepository _studentRepo;
        private readonly IImageRepository _imageRepo;
        private readonly IMapper _mapper;

        public StudentController(IStudentRepository studentRepo, IMapper mapper, IImageRepository imageRepo)
        {
            _studentRepo = studentRepo;
            _mapper = mapper;
            _imageRepo = imageRepo;
        }

        [HttpGet]
        [Route("[controller]")]
        [SwaggerOperation(Summary = "Returns all student")]
        public async Task<ActionResult<List<Dtos.Student>>> GetAllStudents()
        {
            var students = await _studentRepo.GetStudents();
            return Ok(_mapper.Map<List<Dtos.Student>>(students));
        }

        [HttpGet]
        [Route("[controller]/{id:guid}"), ActionName("GetStudentById")]
        [SwaggerOperation(Summary = "Returns a student by id")]
        public async Task<ActionResult<Dtos.Student>> GetStudentById([FromRoute] Guid id)
        {
            var student = await _studentRepo.GetStudentById(id);
            if (student == null) return NotFound();
            return Ok(_mapper.Map<Dtos.Student>(student));
        }

        [HttpPut]
        [Route("[controller]/{id:guid}")]
        [SwaggerOperation(Summary = "Update existing student")]
        public async Task<ActionResult<Dtos.Student>> UpdateStudent([FromRoute] Guid id, [FromBody] UpdateStudentRequest request)
        {
            if (await _studentRepo.ExistsStudentById(id))
            {
                var updatedStudent = await _studentRepo.UpdateStudent(id, _mapper.Map<Entities.Student>(request));

                if (updatedStudent != null)
                    return Ok(_mapper.Map<Dtos.Student>(updatedStudent));
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("[controller]/{id:guid}")]
        [SwaggerOperation(Summary = "Delete existing student")]
        public async Task<IActionResult> DeleteStudent([FromRoute] Guid id)
        {
            if (await _studentRepo.ExistsStudentById(id))
            {
                var deletedStudent = await _studentRepo.DeleteStudent(id);

                if (deletedStudent != null)
                    return NoContent();
            }
            return NotFound();
        }

        [HttpPost]
        [Route("[controller]/Add")]
        [SwaggerOperation(Summary = "Insert a new student")]
        public async Task<ActionResult<Dtos.Student>> AddStudent([FromBody] AddStudentRequest request)
        {
            var createdStudent = await _studentRepo.AddStudent(_mapper.Map<Entities.Student>(request));
            return CreatedAtAction("GetStudentById", new { id = createdStudent.Id },
                _mapper.Map<Dtos.Student>(createdStudent));
        }

        [HttpPost]
        [Route("[controller]/{id:guid}/upload-image")]
        [SwaggerOperation(Summary = "Upload student's profile image")]
        public async Task<ActionResult<string>> UploadImage([FromRoute] Guid id, IFormFile profileImage)
        {
            if (await _studentRepo.ExistsStudentById(id))
            {
                var filename = Guid.NewGuid() + Path.GetExtension(profileImage.FileName);
                var fileImagePath = await _imageRepo.Upload(profileImage, filename);
                if (await _studentRepo.UpdateProfileImage(id, fileImagePath))
                    return Ok(fileImagePath);
                else
                    return StatusCode(500, "Error uploading image");
            }

            return NotFound();
        }
    }
}
