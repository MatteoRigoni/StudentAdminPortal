using AutoMapper;
using StudentAdminPortal.API.Dtos;

namespace StudentAdminPortal.API.Profiles
{
    public class AddStudentRequestAfterMap : IMappingAction<Dtos.AddStudentRequest, Entities.Student>
    {
        public void Process(AddStudentRequest source, Entities.Student destination, ResolutionContext context)
        {
            destination.Id = Guid.NewGuid();
            destination.Address = new Entities.Address()
            {
                Id = Guid.NewGuid(),
                PhysicalAddress = source.PhysicalAddress,
                PostalAddress = source.PostalAddress
        };
        }
    }
}
