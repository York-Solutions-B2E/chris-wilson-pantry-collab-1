using server.Data;
using server.DataTransferObj;
using server.Models;

namespace server.Service.FamilyServices
{
    public class FamilyService : IFamilyService
    {
        private readonly BackendServerContext _context;


        public FamilyService(BackendServerContext context)
        {
            _context = context;
        }

        public Family CreateFamily(NewFamilyDTO newFamilyDTO)
        {
            try
            {
                Family family = new Family()
                {
                    FamilyName = newFamilyDTO.FamilyName,
                };

                family.Created = DateTime.UtcNow;
                family.Title = ""; //this was for something but the idea was put on hold. Nulls not allowed;

                _context.Families?.Add(family); 
                _context.SaveChanges();

                return family; 

            }catch(Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
            

        }

        public Family GetFamilyById(int Id)
        {
            try
            {
                var family = _context.Families?.Find(Id); 

                if (family == null) {
                    throw new Exception("No family with that Id exists"); 
                }

                return family; 

            }catch(Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

    }
}
