using StudentAdminPortal.API.Repositories;

namespace StudentAdminPortal.API.Infrastructure
{
    public class LocalImageRepository : IImageRepository
    {
        public async Task<string> Upload(IFormFile file, string filename)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"Resources\Images", filename);
            using Stream filestream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(filestream);
            return GetServerRelativePath(filename);
        }

        private string GetServerRelativePath(string filename)
        {
            return Path.Combine(@"Resources\Images", filename);
        }
    }
}
