using server.Models;

namespace server.Service.Roles
{
    public interface IRoleService
    {

        public List<Role> GetRolesByUserId(int id);


    }
}
