﻿namespace StudentAdminPortal.API.Entities
{
    public class Address
    {
        public Guid Id { get; set; }
        public string PhysicalAddress { get; set; }
        public string PostalAddress { get; set; }

        public Student Student { get; set; }
    }
}
