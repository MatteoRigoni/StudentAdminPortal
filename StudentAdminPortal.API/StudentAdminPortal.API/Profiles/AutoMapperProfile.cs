﻿using AutoMapper;

namespace StudentAdminPortal.API.Profiles
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Entities.Student, Dtos.Student>().ReverseMap();
            CreateMap<Entities.Gender, Dtos.Gender>().ReverseMap();
            CreateMap<Entities.Address, Dtos.Address>().ReverseMap();
        }        
    }
}