using AutoMapper;
using StudentAdminPortal.API.Dtos;

namespace StudentAdminPortal.API.Profiles
{
    public class UpdateStudentRequestAfterMap : IMappingAction<Dtos.UpdateStudentRequest, Entities.Student>
    {
        public void Process(UpdateStudentRequest source, Entities.Student destination, ResolutionContext context)
        {
            destination.Address = new Entities.Address()
            {
                PhysicalAddress = source.PhysicalAddress,
                PostalAddress = source.PostalAddress,
            };
        }
    }
}
