using server.DataTransferObj;
using server.Models;

namespace server.Service.FamilyServices
{
    public interface IFamilyService
    {
        public void CreateFamily(NewFamilyDTO newFamilyDTO);

        public Family GetFamilyById(int Id); 
    }
}
