using FluentValidation;
using StudentAdminPortal.API.Dtos;
using StudentAdminPortal.API.Repositories;

namespace StudentAdminPortal.API.Validators
{
    public class UpdateStudentRequestValidator : AbstractValidator<UpdateStudentRequest>
    {
        public UpdateStudentRequestValidator(IStudentRepository studentRepo)
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.DateOfBirth).NotEmpty();
            //RuleFor(x => x.Email).NotEmpty().EmailAddress();
            //RuleFor(x => x.Mobile).GreaterThan("999");
            RuleFor(x => x.GenderId).NotEmpty().Must(id =>
            {
                var gender = studentRepo.GetGenders().Result.ToList()
                    .FirstOrDefault(g => g.Id == id);

                if (gender != null)
                    return true;
                else
                    return false;
            }).WithMessage("Please select a valid Gender");
        }
    }
}
