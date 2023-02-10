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

        public List<FriendsDTO> GetFriends(int Id)
        {

            var friends = _context.Friends?
                .Where(f => f.Family1_Id == Id || f.Family2_Id == Id)
                .Select(f => new FriendsDTO{ 
                    Id = f.Id,
                    SenderId = f.Family1_Id,
                    ReceiverId = f.Family2_Id,
                    Status = f.Status
                })
                .ToList();

            if(friends != null)
            {
                return friends;
            }

            throw new Exception("error getting friends"); 

        }

    }
}
